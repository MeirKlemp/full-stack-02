import uuid from "../../tools/uuid";
import GameObject from "./GameObject";

export default class Component{
    static lastId = 0
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

    public invoke(){
        
    }
}

export type gameEvent = {(component:Component):void}