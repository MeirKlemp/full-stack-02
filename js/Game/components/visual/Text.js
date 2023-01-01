import { GAME_OBJECT_ERROR } from "../../../errors.js";
import Color from "../../util/Color.js";
import Displayable from "./Displayable.js";
export default class TextBlock extends Displayable {
    /**
     * Create new text box
     * @param text The text string
     * @param color The text color (Black by default)
     * @param fontSize The color font size
     * @param fontName The color font style name
     */
    constructor(text = "", color = Color.rgb(0, 0, 0), fontSize = 30, fontName = "Ariel") {
        super();
        this._text = "";
        this._text = text;
        this._fontSize = fontSize;
        this._fontName = fontName;
        this._color = color;
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
     * The text color
     */
    get color() {
        return this._color;
    }
    set color(col) {
        this._color = col;
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
