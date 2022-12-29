import uuid from "../../tools/uuid.js";
import Game from "../gameEngine/Game.js";
import Transform from "../util/Trsansform.js"
import Component, { gameEvent } from "./Component.js";


type Constructor<T> = new (...args:any[])=>T
export default class GameObject{
    
    protected _id:string
    protected _components:Component[]
    protected _game:Game


    /**
     * craete new game object
     * @param game The game
     * @param transfrom the game object transform
     */
    constructor(game:Game,transfrom = new Transform()){
        this._id = uuid()
        this._components = []
        this.addComponent(transfrom);
        this._game = game
    }

    /**
     * Add component to the game object
     * @param component The component to add to the game object
     */
    public addComponent(component:Component):void{
        component.register(this)
        this._components.push(component)
    }
    /**
     * the game object id
     */
    public get id():string{
        return this._id
    }

    /**
     * execute before each frame draw in the game
     */
    public update():void{

    }

    /**
     * execute on the start of the game
     */
    public start():void{

    }

    /**
     * execute on player input
     */
    public onInput(input:string){}

    /**
     * destroy the game object
     */
    public destroy():void{
        this._components.forEach(c => c.destroy())
    }

    /**
     * The object of the game
     */
    public get game():Game{
        return this._game;
    }
    
    /**
     * the transform of the game object
     */
    public get transform():Transform{
        return this._components.find(c=>c instanceof Transform) as Transform
    }

    /**
     * Remove and destroy component form the game object
     * @param componentId the id of the component to remove
     */
    public removeComponent(componentId:string):void{
        this._components.find(c=>c.id==componentId)?.destroy();
        this._components = this._components.filter(c=>c.id!=componentId);
    }

    /**
     * Get first component of the game object with a given type
     * @param componentType the type of the component to get
     * @returns the component of the game object with the lgiven type
     */
    public getComponent<T>(componentType:Constructor<T>):T|null{
        return this._components.find(c=>c instanceof componentType) as T
    }

    /**
     * Get all the components of a game object with a given type
     * @param componentsType The type of the components to get
     * @returns the components og the game object
     */
    public getComponents<T>(componentsType:Constructor<T>):T[]{
        return this._components.filter(c=>c instanceof componentsType).map(c=>c as T)
    }

    /**
     * Late update
     * execute after each frame draw
     */
    public lateUpdate():void{

    }

    /**
     * Early update
     * execute before the normal update
     */
    public earlyUpdate():void{

    }

    /**
     * update all teh components
     */
    public componentUpdate():void{
        this._components.forEach(c=>c.componentUpdate())
    }        

}