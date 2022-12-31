import Game from "../gameEngine/Game.js";
import Component from "./Component.js";
export default class KillTimer extends Component {
    /**
     * create new kill timer
     * @param time the time befor the game object destruction
     */
    constructor(time) {
        super();
        this._remainingTime = time;
    }
    get remainingTime() {
        return this._remainingTime;
    }
    set remainingTime(value) {
        this._remainingTime = value;
    }
    componentUpdate() {
        this._remainingTime -= Game.deltaTime;
        if (this._remainingTime <= 0) {
            const myObject = this.gameObject;
            if (myObject) {
                myObject.game.destroy(myObject.id);
            }
        }
    }
}
