import GameObject from "../../Game/GameObject.js";
import Game from "../../Game/gameEngine/Game.js";
import GameScores from "./GameScores.js";
import { BAD_CREDENTIALS, GAME_SCORES_NOT_FOUND } from "../../errors.js";
import $ from "../../tools/fastAccess.js";

export default class GameManager extends GameObject {
  private _enemyMoveLeft: boolean = false;
  private _enemyMovingDown: boolean = false;
  private _positionSwapped: boolean = false;
  public readonly downStep: number = 10;
  private _canPlayerShoot: boolean = true;

  constructor(game: Game) {
    super(game);
  }

  public lateUpdate(): void {
    this._enemyMovingDown = false;
    this._positionSwapped = false;
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

  public gameOver(isWin:boolean): void {
    const score = this.game.findGameObjectByType(GameScores)
    if(!score){
      throw new Error(GAME_SCORES_NOT_FOUND)
    }
    const userKey = $.cookie('user')
    if(!userKey){
      throw new Error(BAD_CREDENTIALS)
    }
    this.game.saveState(userKey,{score:score.scores,isWin:isWin});
  }

  public get canPlayerShoot(): boolean {
    return this._canPlayerShoot;
  }

  public set canPlayerShoot(value: boolean) {
    this._canPlayerShoot = value;
  }
}
