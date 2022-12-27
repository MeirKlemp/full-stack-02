import Drawer from "../../../gameEngine/Drawer.js";
import Sprite from "../Sprite.js";
import Renderer from "./Renderer.js";

export default class SpriteRenderer extends Renderer{

    constructor(sprite:Sprite){
        super(sprite)
    }

    public render(context:CanvasRenderingContext2D):void{
        const sprite:Sprite = this._displayItem as Sprite
        Drawer.drawImage(sprite.displayData(),sprite.position,sprite.scale,context)
    }
    
}