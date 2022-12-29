import { GAME_MANAGER_NOT_FOUND } from "../../errors.js";
import GameObject from "../../Game/components/GameObject.js";
import ImageRenderer from "../../Game/components/visual/renderers/ImageRenderer.js";
import Game from "../../Game/gameEngine/Game.js";
import Vector from "../../Game/util/Vector.js";
import GameManager from "./GameManager.js";
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
        const gm = game.findGameObjectByType(GameManager);
        if (gm == null) {
            throw new Error(GAME_MANAGER_NOT_FOUND);
        }
        this._gameManager = gm;
        this.addComponent(animation);
        const renderer = new ImageRenderer(animation);
        this.addComponent(renderer);
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
        if (nextPosition.x < 0 || nextPosition.add(this.transform.scale).x > this.game.boundary.x) {
            this._gameManager.switchSeide();
            this._gameManager.moveDown();
        }
    }
    update() {
        if (this._gameManager.isMovingDown) {
            this.transform.transfer(Vector.down.mult(this._gameManager.downStep));
        }
        this.transform.transfer(this.nextMovement);
    }
}
