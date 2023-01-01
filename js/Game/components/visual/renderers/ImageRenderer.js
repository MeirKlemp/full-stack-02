import Drawer from "../../../gameEngine/Drawer.js";
import Renderer from "./Renderer.js";
export default class ImageRenderer extends Renderer {
    constructor(visualizer) {
        super(visualizer);
        this._visualizer = visualizer;
    }
    render(context) {
        const sprite = this._displayItem;
        Drawer.drawImage(this._visualizer.image, sprite.position, sprite.scale, context);
    }
}
