import {
  GAME_MANAGER_NOT_FOUND,
  GAME_OBJECT_NOT_FOUND,
  GAME_SCORES_NOT_FOUND,
  PLAYER_LIVES_NOT_FOUND,
} from "../../errors.js";
import GameObject from "../../Game/GameObject.js";
import ImageRenderer from "../../Game/components/visual/renderers/ImageRenderer.js";
import Sprite from "../../Game/components/visual/Sprite.js";
import Game from "../../Game/gameEngine/Game.js";
import Transform from "../../Game/util/Trsansform.js";
import Vector from "../../Game/util/Vector.js";
import GameManager from "./GameManager.js";
import Animation from "../../Game/components/visual/Animation.js";
import BoxCollider from "../../Game/components/colliders/BoxCollider.js";
import Bullet from "./Bullet.js";
import GameScores from "./GameScores.js";
import EnemyGroup from "./EnemyGroup.js";
import PlayerLives from "./player-lives/PlayerLives.js";
import AudioPlayer from "../../Game/components/audio/AudioPlayer.js";

export default class EnemyAlien extends GameObject {
  private _scores: number = 0;
  private _initialSpeed: number = 0;
  private _gameManager: GameManager;
  private readonly _accelleration: number = 5;
  private readonly _shootProbability = 0.00001;
  private readonly _baseEnemiesModifier = 57;
  private readonly _gameOverHeight = 100;
  private readonly _difficultyDiff = {
    easy:1,
    medium:1.5,
    hard:2,
    impossible:100
  }

  /**
   * create new Enemy unit
   * @param game the game that the unit will be attached to
   * @param transform the initial transform of the unit
   */
  constructor(game: Game, animation: Animation, transform?: Transform) {
    super(game, transform);
    const gm = game.findGameObjectByType(GameManager);
    if (gm == null) {
      throw new Error(GAME_MANAGER_NOT_FOUND);
    }
    this._gameManager = gm;
    this.addComponent(animation);
    const renderer: ImageRenderer = new ImageRenderer(animation);
    this.addComponent(renderer);

    //add box collider
    const collider = new BoxCollider(Vector.zero, this.transform.scale);
    collider.registerTriggerCollisionEvent(onTriggerEnter);
    this.addComponent(collider);
  }

  /**
   * the unit speed
   */
  public get speed(): number {
    const group = this.game.findGameObjectByType(EnemyGroup);
    if (!group) {
      throw new Error(GAME_OBJECT_NOT_FOUND(EnemyGroup));
    }
    
    return (
      this._initialSpeed +
      this._accelleration * (this._baseEnemiesModifier - group.reaminingAliens)
      * this._difficultyDiff[this._gameManager.difficulty]
    );
  }

  /**
   * the unit speed
   */
  public set speed(value: number) {
    this._initialSpeed = value;
  }

  /**
   * the amount of score the player getting for killing the unit
   */
  public get scores(): number {
    return this._scores;
  }

  /**
   * the amount of scores the player getting for killing the unit
   */
  public set scores(value: number) {
    this._scores = value;
  }

  /**
   * get the next movemenmt
   */
  private get nextMovement(): Vector {
    const moveLeft = this._gameManager.isMovingLeft;
    const direction = moveLeft ? Vector.left : Vector.right;
    const expectedMovement = direction.mult(this.speed * Game.deltaTime);
    return expectedMovement;
  }

  public earlyUpdate(): void {
    const nextPosition = this.nextMovement.add(this.transform.position);
    if (
      nextPosition.x < 0 ||
      nextPosition.add(this.transform.scale).x > this.game.boundary.x
    ) {
      this._gameManager.switchSeide();
      this._gameManager.moveDown();
    }
  }

  public update(): void {
    if (this._gameManager.isMovingDown) {
      this.transform.transfer(Vector.down.mult(this._gameManager.downStep));
    }
    this.transform.transfer(this.nextMovement);
    //randomly shoot a bullet to the player
    if (Math.random() < this.shootRandomness) {
      const bullet = new Bullet(
        this.game,
        this.transform.position.add(
          Vector.left.mult(this.transform.scale.x / 2)
        ),
        true,
        5
      );
      this.game.addGameObject(bullet);
    }
    //if the aliens too low -> kill the player
    if (
      this.transform.position.y >
      this.game.boundary.y - this._gameOverHeight
    ) {
      const lives = this.game.findGameObjectByType(PlayerLives);
      if (!lives) {
        throw new Error(PLAYER_LIVES_NOT_FOUND);
      }
      lives.decreaseLive();
    }
  }

  private get shootRandomness(): number {
    const group = this.game.findGameObjectByType(EnemyGroup);
    if (!group) {
      throw new Error(GAME_OBJECT_NOT_FOUND(EnemyGroup));
    }
    return (
      (this._baseEnemiesModifier - group.reaminingAliens) *
      this._shootProbability * this._difficultyDiff[this._gameManager.difficulty]
    );
  }
}

function onTriggerEnter(self: BoxCollider, other: BoxCollider) {
  if (other.gameObject instanceof Bullet) {
    const bullet = other.gameObject as Bullet;
    const scores = self.gameObject.game.findGameObjectByType(GameScores);
    if (!scores) {
      throw new Error(GAME_SCORES_NOT_FOUND);
    }
    if (!bullet.enemyBullet) {
      //play the death audio
      const audioPlayer = new AudioPlayer();
      audioPlayer.addClip(
        "enemy-death",
        "../../../audio/space-invaders/invaderkilled.wav"
      );
      const deathAudio = new GameObject(self.gameObject.game);
      deathAudio.addComponent(audioPlayer);
      self.gameObject.game.addGameObject(deathAudio);
      audioPlayer.playClip("enemy-death");
      //destroy the enemy
      scores.scores += (self.gameObject as EnemyAlien).scores;
      self.gameObject.game.destroy(self.gameObject.id);
      other.gameObject.game.destroy(other.gameObject.id);
    }
  }
}
