import { GAME_MANAGER_NOT_FOUND } from "../../../errors.js";
import GameObjectGroup from "../../../Game/GameObjectGroup.js";
import Transform from "../../../Game/util/Trsansform.js";
import Vector from "../../../Game/util/Vector.js";
import GameManager from "../GameManager.js";
import PlayerLive from "./PlayerLive.js";
export default class PlayerLives extends GameObjectGroup {
    constructor(game, startLives) {
        super(game);
        this.distancePosition = new Vector(-50, 0);
        this.initialScale = new Vector(60, 30);
        this.distanceFromTop = 40;
        this.distanceFromRight = 100;
        this._currentLives = startLives;
        const position = new Vector(game.boundary.x - this.distanceFromRight, this.distanceFromTop);
        this.transform.transfer(position);
        //add the player lives
        for (let i = 0; i < startLives; i++) {
            const liveTransform = new Transform(this.initialScale, this.distancePosition.mult(i));
            const newLive = new PlayerLive(game, liveTransform, i);
            this.addChild(newLive);
        }
    }
    decreaseLive() {
        this._currentLives--;
        const gameObjectToRemove = this.findChilds(PlayerLive).find(go => go.index == this._currentLives);
        if (gameObjectToRemove) {
            this.game.destroy(gameObjectToRemove.id);
        }
        const manager = this.game.findGameObjectByType(GameManager);
        if (!manager) {
            throw new Error(GAME_MANAGER_NOT_FOUND);
        }
        if (this._currentLives == 0) {
            manager.gameOver(false);
        }
        else {
            manager.killPlayer();
        }
    }
}
