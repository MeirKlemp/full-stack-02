import Game from "./Game.js";
import $ from "../../tools/fastAccess.js";
import Drawer from "./Drawer.js";
export default function runGame(containerId, initGame = (game) => { }) {
    const container = $.id(containerId);
    const canvas = document.createElement("canvas");
    canvas.innerHTML = "The Browser don't support HTML5. No wooden PC allowed for that game!";
    container.append(canvas);
    const drawer = new Drawer(canvas);
    const game = new Game(drawer, initGame);
    game.start();
    setInterval(() => {
        game.update();
        game.drawScreen();
        game.lateUpdate();
    }, Game.deltaTime);
    return game;
}
