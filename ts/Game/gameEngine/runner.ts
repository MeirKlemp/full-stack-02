import Game, { gameInit } from "./Game.js"
import $ from "../../tools/fastAccess.js";
import Drawer from "./Drawer.js";

export default function runGame(containerId:string,initGame:gameInit = (game:Game)=>{}):Game{
    const container = $.id(containerId) as HTMLDivElement
    const canvas = document.createElement("canvas")
    
    canvas.innerHTML = "The Browser don't support HTML5. No wooden PC allowed for that game!"
    container.append(canvas)
    const drawer:Drawer = new Drawer(canvas as HTMLCanvasElement)
    const game:Game = new Game(drawer,initGame);

    game.start();
    setInterval(()=>{
        game.update()
        game.drawScreen()
        game.lateUpdate()
    },Game.deltaTime)

    return game;
}