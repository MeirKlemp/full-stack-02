import { GAME_MANAGER_NOT_FOUND } from "../../errors.js";
import BoxCollider from "../../Game/components/colliders/BoxCollider.js";
import ImageRenderer from "../../Game/components/visual/renderers/ImageRenderer.js";
import Sprite from "../../Game/components/visual/Sprite.js";
import Game from "../../Game/gameEngine/Game.js";
import GameObject from "../../Game/GameObject.js";
import Vector from "../../Game/util/Vector.js";
import Bullet from "./Bullet.js";
import GameManager from "./GameManager.js";
export default class Player extends GameObject {
    constructor(game) {
        super(game);
        this._speed = 200;
        this._shootDelay = 1;
        this._reloadTime = 0;
        const screenCenter = game.boundary.x / 2;
        const playerY = game.boundary.y - 50;
        this.transform.transfer(new Vector(screenCenter, playerY));
        this.transform.resize(new Vector(60, 30));
        const sprite = new Sprite("player", "../../../images/space-invaders/player.png");
        this.addComponent(sprite);
        this.addComponent(new ImageRenderer(sprite));
        const gameManager = game.findGameObjectByType(GameManager);
        if (!gameManager) {
            throw new Error(GAME_MANAGER_NOT_FOUND);
        }
        this._gameManager = gameManager;
        //add collider to the player
        const collider = new BoxCollider(Vector.zero, this.transform.scale);
        collider.registerTriggerCollisionEvent(onTriggerEnter);
        this.addComponent(collider);
    }
    earlyUpdate() {
        this._reloadTime -= Game.deltaTime;
    }
    update() {
        this.trackMovement();
        this.shooter();
    }
    trackMovement() {
        let directionVector = Vector.zero;
        if (Game.getInput("ArrowLeft")) {
            directionVector = Vector.left;
        }
        else if (Game.getInput("ArrowRight")) {
            directionVector = Vector.right;
        }
        let movement = directionVector.mult(this._speed * Game.deltaTime);
        const nextLocation = this.transform.position.add(movement);
        if (nextLocation.x < 0 ||
            nextLocation.x + this.transform.scale.x > this.game.boundary.x) {
            movement = Vector.zero;
        }
        this.transform.transfer(movement);
    }
    shooter() {
        if (Game.getInput("Space") && this._reloadTime <= 0) {
            const bulletPosition = this.transform.position.add(Vector.up.mult(20)).add(Vector.right.mult(this.transform.scale.x / 2));
            const bullet = new Bullet(this.game, bulletPosition, false, 5);
            this.game.addGameObject(bullet);
            this._reloadTime = this._shootDelay;
        }
    }
}
function onTriggerEnter(self, other) {
    if (other.gameObject instanceof Bullet) {
        const bullet = other.gameObject;
        if (bullet.enemyBullet) {
            const game = bullet.game;
            const manager = game.findGameObjectByType(GameManager);
            if (!manager) {
                throw new Error(GAME_MANAGER_NOT_FOUND);
            }
            game.destroy(self.gameObject.id);
            game.destroy(bullet.id);
            manager.gameOver(false);
        }
    }
}
