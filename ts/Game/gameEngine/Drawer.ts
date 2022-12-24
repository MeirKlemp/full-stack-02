import $ from "../../tools/fastAccess";
import Displayable from "../components/visual/Displayable";


export default class Drawer{
    private _canvas:HTMLCanvasElement
    private _context:CanvasRenderingContext2D|null;

    constructor(canvas:HTMLCanvasElement){        
        this._canvas = canvas;
        this._canvas.width = $.w.innerWidth
        this._canvas.height = $.w.innerHeight
        this._context = this._canvas.getContext("2d");
    }

    public drawScreen(elements:Displayable[]){
        
    }
}