import GameObject from "../components/GameObject"
import Drawer from "./Drawer";


export default class Game{

    private _gameObjects:GameObject[]
    private _drawer:Drawer
    private static readonly fps = 60;
     

    constructor(drawer:Drawer){
        this._gameObjects = []
        this._drawer = drawer
    }

    addGameObject(gameObject:GameObject){
        this._gameObjects.push(gameObject)
    }


    public start():void{
        this._gameObjects.forEach(go=>{
            go.start()
        });
    }

    

    public update():void{
        this._gameObjects.forEach(go=>go.update())
    }

    public destroy(id:string){
        this._gameObjects.find(go=>go.id==id)?.destroy()
        this._gameObjects = this._gameObjects.filter(go=>go.id == id)
    }

    public findGameObjectById(id:string):GameObject|undefined{
        return this._gameObjects.find(go=>go.id==id)
    }

    public findGameObject(predicate:{(component:GameObject):void}):GameObject|undefined{
        return this._gameObjects.find(predicate)
    }

    
}



