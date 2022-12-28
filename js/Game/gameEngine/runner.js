import Game from "./Game.js";
import $ from "../../tools/fastAccess.js";
import Drawer from "./Drawer.js";
/**
 * Create and run game
 * @param containerId The div that will contain the game
 * @param initGame function to run on the game loaded
 * @param gameBoundary the size of the game
 * @returns the game object
 */
export default function runGame(containerId, initGame = (game) => { }, gameBoundary) {
    const container = $.id(containerId);
    const canvas = document.createElement("canvas");
    canvas.innerHTML = "The Browser don't support HTML5. No wooden PC allowed for that game!";
    container.append(canvas);
    const drawer = new Drawer(canvas, gameBoundary);
    const game = new Game(drawer, initGame);
    game.start();
    setInterval(() => {
        game.earlyUpdate();
        game.update();
        game.drawScreen();
        game.lateUpdate();
    }, Game.deltaTime);
    document.onkeydown = e => {
        game.onInput(e.code);
    };
    document.onmousedown = e => {
        game.onInput(`Mouse${e.button.toString()}`);
    };
    return game;
}
