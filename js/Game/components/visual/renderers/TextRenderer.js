import Vector from "../../../util/Vector.js";
import Renderer from "./Renderer.js";
export default class TextRenderer extends Renderer {
    /**
     * Create new text renderer
     * @param text The text of the renderer
     * @param padding The padding of the text relative to the game object
     */
    constructor(text, padding = Vector.zero) {
        super(text);
        this._padding = padding;
    }
    /**
     * render the element to the screen
     * @param context the 2d context of the canvas
     */
    render(context) {
        const text = this._displayItem;
        context.font = `${text.fontSize}px ${text.fontName}`;
        context.fillStyle = text.color.color;
        const pos = text.position.add(this._padding);
        context.fillText(text.displayData(), pos.x, pos.y);
    }
}
