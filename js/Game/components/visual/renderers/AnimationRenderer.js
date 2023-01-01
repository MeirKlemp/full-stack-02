import Renderer from "./Renderer.js";
export default class AnimationRenderer extends Renderer {
    constructor(animation) {
        super(animation);
        this._animation = animation;
    }
    render(context) {
        const spriteToDraw = this._animation.currentSprite;
        //Drawer.drawImage(spriteToDraw.displayData(),this._animation.position,this._animation.scale,context)
    }
}
