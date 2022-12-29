import Drawer from "../../../gameEngine/Drawer.js";
import Renderer from "./Renderer.js";
export default class SpriteRenderer extends Renderer {
    constructor(sprite) {
        super(sprite);
        this._image = document.createElement('img');
        this._image.src = sprite.displayData();
    }
    render(context) {
        const sprite = this._displayItem;
        Drawer.drawImage(this._image, sprite.position, sprite.scale, context);
    }
}
