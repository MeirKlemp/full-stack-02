import Solid from "../Solid.js";
import Renderer from "./Renderer.js";


export default class SolidRenderer extends Renderer{



    constructor(solid:Solid){
        super(solid)
    }

    public render(context:CanvasRenderingContext2D):void{
        const position = this.transform.position
        const scale = this.transform.scale
        context.fillStyle = this._displayItem.displayData()
        context.fillRect(position.x,position.y,scale.x,scale.y)
        
    }
}