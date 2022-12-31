import Game from "./Game.js";
import $ from "../../tools/fastAccess.js";
import Drawer from "./Drawer.js";
import BoxCollider from "../components/colliders/BoxCollider.js";
var keys = {};
/**
 * Create and run game
 * @param containerId The div that will contain the game
 * @param initGame function to run on the game loaded
 * @param gameBoundary the size of the game
 * @returns the game object
 */
export default function runGame(containerId, initGame = (game) => { }, gameBoundary) {
    const container = $.id(containerId);
    console.log(container);
    const canvas = document.createElement("canvas");
    canvas.innerHTML = "The Browser don't support HTML5. No wooden PC allowed for that game!";
    container.append(canvas);
    const drawer = new Drawer(canvas, gameBoundary);
    const game = new Game(drawer, initGame);
    game.start();
    executeIntervals(game);
    return game;
}
function executeIntervals(game) {
    requestAnimationFrame(() => {
        runGameIntervals(game);
        executeIntervals(game);
    });
}
function runGameIntervals(game) {
    game.earlyUpdate();
    game.componentUpdate();
    checkCollision(getColliders(game));
    game.update();
    game.drawScreen();
    game.lateUpdate();
}
/**
 * check the collision of all the given colliders
 * @param colliders all the colliders in the game
 */
function checkCollision(colliders) {
    for (const collider of colliders) {
        for (const otherCollider of colliders) {
            if (collider.id !== otherCollider.id) {
                collider.checkCollision(otherCollider);
            }
        }
    }
}
/**
 * Get all the colliders of game
 * @param game the game
 * @returns all the colliders in teh given game
 */
function getColliders(game) {
    return game.rootGameObject.getAllComponents(BoxCollider);
}
