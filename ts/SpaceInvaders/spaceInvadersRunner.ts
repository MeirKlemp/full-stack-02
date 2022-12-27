import Game from "../Game/gameEngine/Game";
import runGame from "../Game/gameEngine/runner";
import GameScores from "./game-objects/GameScores";

const CONTAINER_ID = "game container"
const game = runGame(CONTAINER_ID,initGame)

function initGame(game:Game):void{
    game.addGameObject(new GameScores(game))
}