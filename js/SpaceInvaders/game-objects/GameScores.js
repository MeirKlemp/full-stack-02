import GameObject from "../../Game/components/GameObject.js";
import TextBlock from "../../Game/components/visual/Text.js";
import Vector from "../../Game/util/Vector.js";
export default class GameScores extends GameObject {
    constructor(game) {
        super(game);
        this._scores = 0;
        this.transform.position = Vector.zero;
        this.addComponent(new TextBlock("0"));
    }
    get scores() {
        return this._scores;
    }
    set scores(_scores) {
        this._scores = _scores;
    }
    update() {
        super.update();
        this.scores++;
        const text = this.getComponent(TextBlock);
        if (text != null) {
            text.text = this.scores.toString();
        }
    }
}
