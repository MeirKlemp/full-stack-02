import GameObject from "../../Game/components/GameObject.js";
import TextRenderer from "../../Game/components/visual/renderers/TextRenderer.js";
import TextBlock from "../../Game/components/visual/Text.js";
import Color from "../../Game/util/Color.js";
import Vector from "../../Game/util/Vector.js";
const scoresLabel = "S C O R E";
export default class GameScores extends GameObject {
    constructor(game, transform) {
        super(game, transform);
        this._scores = 0;
        const textBlock = new TextBlock("0", Color.WHITE, 30, "ArcadeClassic");
        this.addComponent(textBlock);
        this.addComponent(new TextRenderer(textBlock, Vector.down.mult(30)));
        const scoreTitleBlock = new TextBlock(scoresLabel, Color.WHITE, 30, "ArcadeClassic");
        this.addComponent(scoreTitleBlock);
        this.addComponent(new TextRenderer(scoreTitleBlock));
    }
    get scores() {
        return this._scores;
    }
    set scores(_scores) {
        this._scores = _scores;
    }
    update() {
        super.update();
        const text = this.getComponent(TextBlock);
        if (text != null) {
            text.text = this.format;
        }
    }
    get format() {
        const str = String(this._scores).padStart(4, '0');
        return str.replace(/(\d)/gi, "$1 ");
    }
}
