import GameObject from "../../Game/components/GameObject.js";
import Game from "../../Game/gameEngine/Game.js";

export default class GameManager extends GameObject {
  private _enemyMoveLeft: boolean = false;
  private _enemyMovingDown: boolean = false;

  constructor(game: Game) {
    super(game);
  }

  public lateUpdate(): void {
    this._enemyMovingDown = false;
  }

  /**
   * change the movement side of the enemy units
   */
  public switchSeide() {
    this._enemyMoveLeft = !this._enemyMoveLeft;
  }

  /**
   * is the unit mobing left
   */
  public get isMovingLeft(): boolean {
    return this._enemyMoveLeft;
  }
}
