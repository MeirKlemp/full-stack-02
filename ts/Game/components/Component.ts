import uuid from "../../tools/uuid.js";
import GameObject from "./GameObject.js";

export default class Component{
    protected _id:string
    protected _gameObject:GameObject|null

    constructor(){
        this._id = uuid();
        this._gameObject = null
    }

    public get id():string{
        return this._id
    }
    
    public register(gameObject:GameObject):void{
        this._gameObject = gameObject
    }

    public destroy(){
        
    }
    public selfDestroy():void{
        this._gameObject?.removeComponent(this._id);
    }

    public componentUpdate():void{}
}

export type gameEvent = {(component:Component):void}