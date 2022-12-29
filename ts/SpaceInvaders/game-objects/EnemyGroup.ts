import Game from "../../Game/gameEngine/Game.js";
import GameObjectGroup from "../../Game/GameObjectGroup.js";
import Transform from "../../Game/util/Trsansform.js";
import Vector from "../../Game/util/Vector.js";
import Animation from "../../Game/components/visual/Animation.js";
import EnemyAlien from "./EnemyAlien.js";
import GameManager from "./GameManager.js";
import { GAME_MANAGER_NOT_FOUND } from "../../errors.js";

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

export default class EnemyGroup extends GameObjectGroup {
    private _gameManager:GameManager
  constructor(game: Game) {
    super(game);
    const gm = game.findGameObjectByType(GameManager)
    if(!gm){
        throw new Error(GAME_MANAGER_NOT_FOUND);
    }
    this._gameManager = gm
    this.transform.transfer(new Vector(20, 150));
    this.setEnemies();
  }

  private setEnemies(): void {
    const scores = [30, 20, 20, 10, 10];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 11; j++) {
        this.spawnEnemy(new Vector(j * 50, i * 50), scores[i], ...sprites[i]);
      }
    }
  }

  private spawnEnemy(
    position: Vector,
    scores: number,
    ...imagesPath: string[]
  ) {
    const enemyTransform = new Transform(new Vector(50, 50), position);
    const enemyAnimation = new Animation("demoEnemy", 0.5, ...imagesPath);
    const enemy = new EnemyAlien(this._game, enemyAnimation, enemyTransform);
    enemy.speed = 10;
    enemy.scores = scores;
    this.addChild(enemy);
  }


}
