import GameObject from "../components/GameObject.js"
import Renderer from "../components/visual/renderers/Renderer.js";
import Drawer from "./Drawer.js";

export type gameInit = {(game:Game):void}
export default class Game{

    private _gameObjects:GameObject[]
    private _drawer:Drawer
    private static readonly fps = 60;
    public static readonly deltaTime = 1000/Game.fps
     

    constructor(drawer:Drawer,initFunction:gameInit){
        this._gameObjects = []
        this._drawer = drawer
        this.init(initFunction)
    }

    public addGameObject(gameObject:GameObject){
        this._gameObjects.push(gameObject)
    }


    public start():void{
        this._gameObjects.forEach(go=>{
            go.start()
        });
    }

    public get drawer():Drawer{
        return this._drawer;
    }

    public update():void{
        this._gameObjects.forEach(go=>go.update())
    }

    public drawScreen():void{
        const renderers:Renderer[] = this._gameObjects.reduce<Renderer[]>((prev:Renderer[],go:GameObject)=>[...prev,...go.getComponents(Renderer)],[])
        this.drawer.drawScreen(renderers)
    }

    public lateUpdate():void{
        this._gameObjects.forEach(go=>go.lateUpdate())
    }

    public destroy(id:string){
        this._gameObjects.find(go=>go.id==id)?.destroy()
        this._gameObjects = this._gameObjects.filter(go=>go.id == id)
    }

    public findGameObjectById(id:string):GameObject|undefined{
        return this._gameObjects.find(go=>go.id==id)
    }

    public findGameObject(predicate:{(component:GameObject):void}):GameObject|undefined{
        return this._gameObjects.find(predicate);
    }

    private init(initFunction:gameInit):void{
        initFunction(this)
    }
    
}



