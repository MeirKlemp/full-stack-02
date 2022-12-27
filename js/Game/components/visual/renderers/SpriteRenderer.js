import Drawer from "../../../gameEngine/Drawer.js";
import Renderer from "./Renderer.js";
export default class SpriteRenderer extends Renderer {
    constructor(sprite) {
        super(sprite);
    }
    render(context) {
        const sprite = this._displayItem;
        Drawer.drawImage(sprite.displayData(), sprite.position, sprite.scale, context);
    }
}
