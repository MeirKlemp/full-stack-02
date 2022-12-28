import { GAME_MANAGER_NOT_FOUND } from "../../errors.js";
import GameObject from "../../Game/components/GameObject.js";
import GameManager from "./GameManager.js";
export default class Enemy extends GameObject {
    /**
     * create new Enemy unit
     * @param game the game that the unit will be attached to
     * @param transform the initial transform of the unit
     */
    constructor(game, transform) {
        super(game, transform);
        this._scores = 0;
        this._speed = 0;
        this._movingLeft = false;
        const gm = game.findGameObjectByType(GameManager);
        if (gm == null) {
            throw new Error(GAME_MANAGER_NOT_FOUND);
        }
        this._gameManager = gm;
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
        this._scores = this.scores;
    }
}
