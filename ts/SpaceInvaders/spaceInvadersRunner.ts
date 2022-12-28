import Game from "../Game/gameEngine/Game.js";
import runGame from "../Game/gameEngine/runner.js";
import Color from "../Game/util/Color.js";
import Transform from "../Game/util/Trsansform.js";
import Vector from "../Game/util/Vector.js";
import GameScores from "./game-objects/GameScores.js";

const CONTAINER_ID = "game container"
const game = runGame(CONTAINER_ID,initGame,new Vector(1080,720))
initGame(game)

function initGame(game:Game):void{
    game.drawer.backgroundColor = Color.rgb(50,50,50)
    setScores(game);
    setEnemies(game)
}

function setScores(game:Game):void{
    const scoresTransform = new Transform(Vector.zero,new Vector(20,40),Vector.zero)
    const scores = new GameScores(game,scoresTransform)
    scores.scores = 100;
    game.addGameObject(scores)
}

function setEnemies(game:Game):void{
    
}
