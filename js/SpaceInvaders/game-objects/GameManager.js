import GameObject from "../../Game/components/GameObject.js";
export default class GameManager extends GameObject {
    constructor(game) {
        super(game);
        this._enemyMoveLeft = false;
        this._enemyMovingDown = false;
    }
    lateUpdate() {
        this._enemyMovingDown = false;
    }
    /**
     * change the movement side of the enemy units
     */
    switchSeide() {
        this._enemyMoveLeft = !this._enemyMoveLeft;
    }
    /**
     * is the unit mobing left
     */
    get isMovingLeft() {
        return this._enemyMoveLeft;
    }
}
