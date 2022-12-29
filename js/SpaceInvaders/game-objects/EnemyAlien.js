import { GAME_MANAGER_NOT_FOUND, GAME_SCORES_NOT_FOUND } from "../../errors.js";
import GameObject from "../../Game/GameObject.js";
import ImageRenderer from "../../Game/components/visual/renderers/ImageRenderer.js";
import Game from "../../Game/gameEngine/Game.js";
import Vector from "../../Game/util/Vector.js";
import GameManager from "./GameManager.js";
import BoxCollider from "../../Game/components/colliders/BoxCollider.js";
import Bullet from "./Bullet.js";
import GameScores from "./GameScores.js";
export default class EnemyAlien extends GameObject {
    /**
     * create new Enemy unit
     * @param game the game that the unit will be attached to
     * @param transform the initial transform of the unit
     */
    constructor(game, animation, transform) {
        super(game, transform);
        this._scores = 0;
        this._speed = 0;
        this._shootProbability = 0.000001;
        const gm = game.findGameObjectByType(GameManager);
        if (gm == null) {
            throw new Error(GAME_MANAGER_NOT_FOUND);
        }
        this._gameManager = gm;
        this.addComponent(animation);
        const renderer = new ImageRenderer(animation);
        this.addComponent(renderer);
        //add box collider
        const collider = new BoxCollider(Vector.zero, this.transform.scale);
        collider.registerTriggerCollisionEvent(onTriggerEnter);
        this.addComponent(collider);
    }
    /**
     * the unit speed
     */
    get speed() {
        return this._speed;
    }
    /**
     * the unit speed
     */
    set speed(value) {
        this._speed = value;
    }
    /**
     * the amount of score the player getting for killing the unit
     */
    get scores() {
        return this._scores;
    }
    /**
     * the amount of scores the player getting for killing the unit
     */
    set scores(value) {
        this._scores = value;
    }
    /**
     * get the next movemenmt
     */
    get nextMovement() {
        const moveLeft = this._gameManager.isMovingLeft;
        const direction = moveLeft ? Vector.left : Vector.right;
        const expectedMovement = direction.mult(this.speed * Game.deltaTime);
        return expectedMovement;
    }
    earlyUpdate() {
        const nextPosition = this.nextMovement.add(this.transform.position);
        if (nextPosition.x < 0 ||
            nextPosition.add(this.transform.scale).x > this.game.boundary.x) {
            this._gameManager.switchSeide();
            this._gameManager.moveDown();
        }
    }
    update() {
        if (this._gameManager.isMovingDown) {
            this.transform.transfer(Vector.down.mult(this._gameManager.downStep));
        }
        this.transform.transfer(this.nextMovement);
        //randomly shoot a bullet to the player
        if (Math.random() < this.shootRandomness) {
            const bullet = new Bullet(this.game, this.transform.position.add(Vector.left.mult(this.transform.scale.x / 2)), true, 5);
            this.game.addGameObject(bullet);
        }
    }
    get shootRandomness() {
        const scores = this.game.findGameObjectByType(GameScores);
        if (!scores) {
            throw new Error(GAME_SCORES_NOT_FOUND);
        }
        return (scores.scores + 10) * this._shootProbability;
    }
}
function onTriggerEnter(self, other) {
    if (other.gameObject instanceof Bullet) {
        const bullet = other.gameObject;
        const scores = self.gameObject.game.findGameObjectByType(GameScores);
        if (!scores) {
            throw new Error(GAME_SCORES_NOT_FOUND);
        }
        if (!bullet.enemyBullet) {
            scores.scores += self.gameObject.scores;
            self.gameObject.game.destroy(self.gameObject.id);
            other.gameObject.game.destroy(other.gameObject.id);
        }
    }
}
