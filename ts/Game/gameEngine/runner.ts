import Game, { gameInit } from "./Game.js"
import $ from "../../tools/fastAccess.js";
import Drawer from "./Drawer.js";
import Vector from "../util/Vector.js";
import BoxCollider from "../components/colliders/BoxCollider.js";
import GameObject from "../GameObject.js";

var keys:any = {};

/**
 * Create and run game
 * @param containerId The div that will contain the game
 * @param initGame function to run on the game loaded
 * @param gameBoundary the size of the game
 * @returns the game object
 */
export default function runGame(containerId:string,initGame:gameInit = (game:Game)=>{},gameBoundary?:Vector):Game{
    const container = $.id(containerId) as HTMLDivElement
    console.log(container)
    const canvas = document.createElement("canvas")
    
    canvas.innerHTML = "The Browser don't support HTML5. No wooden PC allowed for that game!"
    container.append(canvas)
    const drawer:Drawer = new Drawer(canvas as HTMLCanvasElement,gameBoundary)
    const game:Game = new Game(drawer,initGame);

    game.start();
    executeIntervals(game)

    
    return game;
}

function executeIntervals(game:Game){
    requestAnimationFrame(()=>{
        runGameIntervals(game)
        executeIntervals(game)
    })
}

function runGameIntervals(game:Game):void{
    
    game.earlyUpdate()
    game.componentUpdate()
    checkCollision(getColliders(game))
    game.update()
    game.drawScreen()
    game.lateUpdate()

}

/**
 * check the collision of all the given colliders
 * @param colliders all the colliders in the game
 */
function checkCollision(colliders:BoxCollider[]):void{
    for(const collider of colliders){
        for(const otherCollider of colliders){
            if(collider.id!==otherCollider.id){
                collider.checkCollision(otherCollider)
            }
        }
    }
}

/**
 * Get all the colliders of game
 * @param game the game
 * @returns all the colliders in teh given game
 */
function getColliders(game:Game):BoxCollider[]{

    return game.rootGameObject.getAllComponents(BoxCollider)
}
