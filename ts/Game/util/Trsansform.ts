import Component from "../components/Component.js";
import Vector from "./Vector.js";
import Resizable from "../components/visual/Resizeble.js";

export default class Transform extends Component{
    private _scale:Vector
    private _position:Vector
    private _rotation:Vector

    public get position():Vector{
        return this._position;
    }

    public get scale():Vector{
         return this._scale;
    }

    public get rotation():Vector{
        return this._rotation
    }

    public transfer(movement:Vector):void{
        this._position = this._position.add(movement)
    }

    public resize(newSize:Vector):void{
        this._scale = newSize
        if(this._gameObject!=null){
            this._gameObject.getComponents(Resizable).forEach(r=>r.resize(this.scale))
        }
    }

    public rotate(angle:Vector):void{
        this._rotation = this._rotation.add(angle)
    }

    public set position(newPosition:Vector){
        this.position = newPosition;
    }

    constructor(scale:Vector = new Vector(1,1),position:Vector = Vector.zero,rotation:Vector = Vector.zero){
        super();
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
    }
}