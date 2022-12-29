import Game from "../Game/gameEngine/Game.js";
import runGame from "../Game/gameEngine/runner.js";
import Color from "../Game/util/Color.js";
import Transform from "../Game/util/Trsansform.js";
import Vector from "../Game/util/Vector.js";
import EnemyGroup from "./game-objects/EnemyGroup.js";
import GameManager from "./game-objects/GameManager.js";
import GameScores from "./game-objects/GameScores.js";
import Player from "./game-objects/Player.js";

const CONTAINER_ID = "game container";
runGame(CONTAINER_ID, initGame, new Vector(800, 720));

function initGame(game: Game): void {
  game.drawer.backgroundColor = Color.rgb(50, 50, 50);
  setGameManager(game);
  setScores(game);
  game.addGameObject(new EnemyGroup(game))
  game.addGameObject(new Player(game))
}

function setScores(game: Game): void {
  const scoresTransform = new Transform(
    Vector.zero,
    new Vector(20, 40),
    Vector.zero
  );
  const scores = new GameScores(game, scoresTransform);
  scores.scores = 0;
  game.addGameObject(scores);
}

function setGameManager(game: Game) {
  const manager = new GameManager(game);
  game.addGameObject(manager);
}
