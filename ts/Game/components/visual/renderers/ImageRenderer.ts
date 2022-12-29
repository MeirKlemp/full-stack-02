import Drawer from "../../../gameEngine/Drawer.js";
import ImageVisulizer from "../ImageVisualizer.js";
import Sprite from "../Sprite.js";
import Renderer from "./Renderer.js";

export default class ImageRenderer extends Renderer{

    private _visualizer:ImageVisulizer

    constructor(visualizer:ImageVisulizer){
        super(visualizer)
        this._visualizer = visualizer
    }

    public render(context:CanvasRenderingContext2D):void{
        const sprite:Sprite = this._displayItem as Sprite
        Drawer.drawImage(this._visualizer.image,sprite.position,sprite.scale,context)
    }
    
}