import { GAME_OBJECT_ERROR } from "../../errors.js";
import uuid from "../../tools/uuid.js";
import GameObject from "../GameObject.js";

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

    public get gameObject():GameObject{
        if(!this._gameObject){
            throw new Error(GAME_OBJECT_ERROR)
        }
        return this._gameObject
    }

    public componentUpdate():void{}
}

export type gameEvent = {(component:Component):void}