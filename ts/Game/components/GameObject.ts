import uuid from "../../tools/uuid";
import Game from "../gameEngine/Game";
import Transform from "../util/Trsansform"
import Component, { gameEvent } from "./Component";



export default class GameObject{
    
    protected _transform:Transform
    protected _id:string
    protected _components:Component[]



    constructor(game:Game,transfrom = new Transform()){
        this._transform = transfrom;
        this._id = uuid()
        this._components = []
    }

    public addComponent(component:Component):void{
        component.register(this)
    }

    public get id():string{
        return this._id
    }

    public update():void{

    }

    public start():void{

    }


}