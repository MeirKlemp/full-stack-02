import GameObject from "../../Game/GameObject.js";
import Game from "../../Game/gameEngine/Game.js";
import GameScores from "./GameScores.js";
import {
  BAD_CREDENTIALS,
  GAME_OBJECT_NOT_FOUND,
  GAME_SCORES_NOT_FOUND,
} from "../../errors.js";
import $ from "../../tools/fastAccess.js";
import Player from "./Player.js";
import ScoresState from "../ScoresState.js";
import BonusSpaceship from "./BonusSpaceship.js";

export enum GameDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  IMPOSSIBLE = "impossible",
}
export default class GameManager extends GameObject {
  private _enemyMoveLeft: boolean = false;
  private _enemyMovingDown: boolean = false;
  private _positionSwapped: boolean = false;
  public readonly downStep: number = 10;
  private _canPlayerShoot: boolean = true;
  private _respawnTimer: number = 0;
  private _playerDead: boolean = false;
  private _bonusRemainingTime:number = 0
  public readonly difficulty: GameDifficulty;
  public readonly bonusProbability = 0.0005;
  public readonly bonusCooldown = 4


  constructor(game: Game, difficulty: GameDifficulty = GameDifficulty.EASY) {
    super(game);
    this.difficulty = difficulty;
  }

  public lateUpdate(): void {
    this._enemyMovingDown = false;
    this._positionSwapped = false;
    if (this._playerDead) {
      this._respawnTimer -= Game.deltaTime;
      if (this._respawnTimer <= 0) {
        this.respawnPlayer();
        this._playerDead = false;
      }
    }
    this._bonusRemainingTime-=Game.deltaTime
    //add bonus spaceship sometimes
    if (Math.random() < this.bonusProbability&&this._bonusRemainingTime<=0) {
      this.game.addGameObject(new BonusSpaceship(this.game));
      this._bonusRemainingTime = this.bonusCooldown
    }
  }

  /**
   * change the movement side of the enemy units
   */
  public switchSeide() {
    if (!this._positionSwapped) {
      this._enemyMoveLeft = !this._enemyMoveLeft;
      this._positionSwapped = true;
    }
  }

  /**
   * respawn the player
   */
  private respawnPlayer(): void {
    const player = new Player(this.game);
    this.game.addGameObject(player);
  }

  /**
   * set the enemies to move down one step
   */
  public moveDown(): void {
    this._enemyMovingDown = true;
  }

  /**
   * is the unit mobing left
   */
  public get isMovingLeft(): boolean {
    return this._enemyMoveLeft;
  }

  /**
   * are the enemy units needs to move down
   */
  public get isMovingDown(): boolean {
    return this._enemyMovingDown;
  }

  /**
   * are the enemy units needs to move down
   */
  public set isMovingDown(value: boolean) {
    this._enemyMovingDown = value;
  }

  /**
   * kill the player
   */
  public killPlayer(): void {
    this._respawnTimer = 1.5;
    this._playerDead = true;
    const player = this.game.findGameObjectByType(Player);
    if (player) {
      this.game.destroy(player.id);
    }
  }

  /**
   * set the game to game over mode
   * @param isWin is teh player won
   */
  public gameOver(isWin: boolean): void {
    const score = this.game.findGameObjectByType(GameScores);
    if (!score) {
      throw new Error(GAME_SCORES_NOT_FOUND);
    }
    let userKey = $.session("currentUsername");
    if (!userKey) {
      throw new Error(BAD_CREDENTIALS);
    }
    userKey = `${userKey}_si`;
    const data = this.game.loadState(userKey);
    const state = ScoresState.load(data);
    const diffScore = state[this.difficulty];
    diffScore.lastScores = score.scores;
    diffScore.bestScores = Math.max(diffScore.bestScores, score.scores);
    this.game.saveState(userKey, state);
    const p:Promise<void> = new Promise((res,rej)=>res())
    p.then(()=>$.cookie = `win=${isWin}`).then(()=>this.game.restart())
  }

  /**
   * can the player shoot now
   */
  public get canPlayerShoot(): boolean {
    return this._canPlayerShoot;
  }

  /**
   * can the player shoot now
   */
  public set canPlayerShoot(value: boolean) {
    this._canPlayerShoot = value;
  }
}
