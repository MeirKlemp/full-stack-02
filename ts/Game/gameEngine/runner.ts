import Game from "./Game"
import $ from "../../tools/fastAccess";
import Drawer from "./Drawer";


export default function runGame(canvasId:string){
    const drawer:Drawer = new Drawer($.id(canvasId) as HTMLCanvasElement)
    const game:Game = new Game(drawer);
    const fps:number = 60
    game.start();
    setInterval(game.update,1000/fps)

    return game;
}