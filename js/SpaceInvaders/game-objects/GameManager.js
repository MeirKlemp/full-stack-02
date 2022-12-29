import GameObject from "../../Game/GameObject.js";
import GameScores from "./GameScores.js";
import { BAD_CREDENTIALS, GAME_SCORES_NOT_FOUND } from "../../errors.js";
import $ from "../../tools/fastAccess.js";
export default class GameManager extends GameObject {
    constructor(game) {
        super(game);
        this._enemyMoveLeft = false;
        this._enemyMovingDown = false;
        this._positionSwapped = false;
        this.downStep = 10;
        this._canPlayerShoot = true;
    }
    lateUpdate() {
        this._enemyMovingDown = false;
        this._positionSwapped = false;
    }
    /**
     * change the movement side of the enemy units
     */
    switchSeide() {
        if (!this._positionSwapped) {
            this._enemyMoveLeft = !this._enemyMoveLeft;
            this._positionSwapped = true;
        }
    }
    /**
     * set the enemies to move down one step
     */
    moveDown() {
        this._enemyMovingDown = true;
    }
    /**
     * is the unit mobing left
     */
    get isMovingLeft() {
        return this._enemyMoveLeft;
    }
    /**
     * are the enemy units needs to move down
     */
    get isMovingDown() {
        return this._enemyMovingDown;
    }
    /**
     * are the enemy units needs to move down
     */
    set isMovingDown(value) {
        this._enemyMovingDown = value;
    }
    gameOver(isWin) {
        const score = this.game.findGameObjectByType(GameScores);
        if (!score) {
            throw new Error(GAME_SCORES_NOT_FOUND);
        }
        const userKey = $.cookie('user');
        if (!userKey) {
            throw new Error(BAD_CREDENTIALS);
        }
        this.game.saveState(userKey, { score: score.scores, isWin: isWin });
    }
    get canPlayerShoot() {
        return this._canPlayerShoot;
    }
    set canPlayerShoot(value) {
        this._canPlayerShoot = value;
    }
}
