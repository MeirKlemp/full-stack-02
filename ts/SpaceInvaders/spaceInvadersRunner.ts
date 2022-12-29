import Animation from "../Game/components/visual/Animation.js";
import Sprite from "../Game/components/visual/Sprite.js";
import Game from "../Game/gameEngine/Game.js";
import runGame from "../Game/gameEngine/runner.js";
import Color from "../Game/util/Color.js";
import Transform from "../Game/util/Trsansform.js";
import Vector from "../Game/util/Vector.js";
import EnemyAlien from "./game-objects/EnemyAlien.js";
import Enemy from "./game-objects/EnemyAlien.js";
import GameManager from "./game-objects/GameManager.js";
import GameScores from "./game-objects/GameScores.js";

const CONTAINER_ID = "game container";
const game = runGame(CONTAINER_ID, initGame, new Vector(800, 720));
//initGame(game)

function initGame(game: Game): void {
  game.drawer.backgroundColor = Color.rgb(50, 50, 50);
  setGameManager(game);
  setScores(game);
  setEnemies(game);
}

function setScores(game: Game): void {
  const scoresTransform = new Transform(
    Vector.zero,
    new Vector(20, 40),
    Vector.zero
  );
  const scores = new GameScores(game, scoresTransform);
  scores.scores = 100;
  game.addGameObject(scores);
}

function setEnemies(game: Game): void {
  //set up the sprites for the enemies
  const sprites = [
    [
      "../../images/space-invaders/alien30.png",
      "../../images/space-invaders/alien31.png",
    ],
    [
      "../../images/space-invaders/alien20.png",
      "../../images/space-invaders/alien21.png",
    ],
    [
      "../../images/space-invaders/alien20.png",
      "../../images/space-invaders/alien21.png",
    ],
    [
      "../../images/space-invaders/alien10.png",
      "../../images/space-invaders/alien11.png",
    ],
    [
      "../../images/space-invaders/alien10.png",
      "../../images/space-invaders/alien11.png",
    ],
  ];
  const scores = [30,20,20,10,10]
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 11; j++) {
        spawnEnemy(game,new Vector(20+j*50,150+i*50),scores[i],...sprites[i])
    }
  }
}

function spawnEnemy(game: Game, position: Vector,scores:number, ...imagesPath: string[]) {
  const enemyTransform = new Transform(new Vector(50, 50), position);
  const enemyAnimation = new Animation("demoEnemy", 0.5, ...imagesPath);
  const enemy = new Enemy(game, enemyAnimation, enemyTransform);
  enemy.speed = 10;
  enemy.scores = scores
  game.addGameObject(enemy);
}

function setGameManager(game: Game) {
  const manager = new GameManager(game);
  game.addGameObject(manager);
}
