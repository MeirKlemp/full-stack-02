import GameObject from "../../Game/components/GameObject.js";
export default class GameManager extends GameObject {
    constructor(game) {
        super(game);
        this._enemyMoveLeft = false;
        this._enemyMovingDown = false;
        this._positionSwapped = false;
        this.downStep = 10;
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
}
