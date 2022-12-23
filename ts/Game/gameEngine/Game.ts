import GameObject from "../components/GameObject"
import Drawer from "./Drawer";


export default class Game{

    private _gameObjects:GameObject[]
    private _drawer:Drawer
    private static readonly fps = 60;
     

    constructor(){
        this._gameObjects = []
        this._drawer = new Drawer()//TODO :: get the drawer canvas
    }

    addGameObject(gameObject:GameObject){
        this._gameObjects.push(gameObject)
    }


    public start():void{
        this._gameObjects.forEach(go=>{
            go.start()
        })
    }

    public update():void{
        this._gameObjects.forEach(go=>go.update())
    }

    public destroy(gameObject:GameObject){
        this._gameObjects = this._gameObjects.filter(go=>go.id)
    }

    
}



