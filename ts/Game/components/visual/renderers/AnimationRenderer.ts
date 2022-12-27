import Animation from "../Animation.js";
import Sprite from "../Sprite.js";
import Drawer from "../../../gameEngine/Drawer.js";
import Renderer from "./Renderer.js";

export default class AnimationRenderer extends Renderer{
    /**
     * The anumation to render
     */
    private _animation:Animation
    constructor(animation:Animation){
        super(animation);
        this._animation = animation;
    }

    public render(context:CanvasRenderingContext2D):void{
        const spriteToDraw:Sprite = this._animation.currentSprite
        Drawer.drawImage(spriteToDraw.displayData(),this._animation.position,this._animation.scale,context)
    }
}