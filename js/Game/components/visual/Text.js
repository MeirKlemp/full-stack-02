import { GAME_OBJECT_ERROR } from "../../../errors.js";
import Displayable from "./Displayable.js";
export default class TextBlock extends Displayable {
    constructor(text = "", fontSize = 30, fontName = "Ariel") {
        super();
        this._text = "";
        this._text = text;
        this._fontSize = fontSize;
        this._fontName = fontName;
    }
    /**
     * The text font size in PX
     */
    get fontSize() {
        return this._fontSize;
    }
    set fontSize(value) {
        this._fontSize = value;
    }
    /**
     * The text font name
     */
    get fontName() {
        return this._fontName;
    }
    set fontName(value) {
        this._fontName = value;
    }
    /**
     * Resize the text
     * @param scale the new size of the text. using only the vector x axis
     */
    resize(scale) {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        this._gameObject.transform.resize(scale);
        this._fontSize = scale.x;
    }
    /**
     * The text string
     */
    set text(_text) {
        this._text = _text;
    }
    get text() {
        return this._text;
    }
    /**
     * The data to display
     * @returns The text string
     */
    displayData() {
        return this._text;
    }
}
