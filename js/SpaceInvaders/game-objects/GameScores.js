import GameObject from "../../Game/GameObject.js";
import TextRenderer from "../../Game/components/visual/renderers/TextRenderer.js";
import TextBlock from "../../Game/components/visual/Text.js";
import Color from "../../Game/util/Color.js";
import Vector from "../../Game/util/Vector.js";
export default class GameScores extends GameObject {
    constructor(game, transform) {
        super(game, transform);
        this._scores = 0;
        const size = 40;
        this._scoresText = "S C O R E";
        const textBlock = new TextBlock("0", Color.WHITE, size, "ArcadeClassic");
        this._scoresTextBlock = textBlock;
        this.addComponent(textBlock);
        this.addComponent(new TextRenderer(textBlock, Vector.down.mult(size)));
        const scoreTitleBlock = new TextBlock(this._scoresText, Color.WHITE, size, "ArcadeClassic");
        this._titleTextBlock = scoreTitleBlock;
        this.addComponent(scoreTitleBlock);
        this.addComponent(new TextRenderer(scoreTitleBlock));
    }
    get scores() {
        return this._scores;
    }
    set scores(_scores) {
        this._scores = _scores;
    }
    get title() {
        return this._scoresText;
    }
    set title(value) {
        this._scoresText = value;
    }
    update() {
        super.update();
        this._scoresTextBlock.text = this.format;
        this._titleTextBlock.text = this._scoresText;
    }
    get format() {
        const str = String(this._scores).padStart(4, '0');
        return str.replace(/(\d)/gi, "$1  ");
    }
}
