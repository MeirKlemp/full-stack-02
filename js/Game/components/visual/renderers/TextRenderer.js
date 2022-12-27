import Renderer from "./Renderer.js";
export default class TextRenderer extends Renderer {
    constructor(text) {
        super(text);
    }
    /**
     * render the element to the screen
     * @param context the 2d context of the canvas
     */
    render(context) {
        const text = this._displayItem;
        context.font = `${text.fontSize}px ${text.fontName}`;
        context.fillText(text.displayData(), text.position.x, text.position.y);
    }
}
