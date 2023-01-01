import { GAME_MANAGER_NOT_FOUND } from "../../../errors.js";
import Game from "../../../Game/gameEngine/Game.js";
import GameObjectGroup from "../../../Game/GameObjectGroup.js";
import Transform from "../../../Game/util/Trsansform.js";
import Vector from "../../../Game/util/Vector.js";
import GameManager from "../GameManager.js";
import PlayerLive from "./PlayerLive.js";

export default class PlayerLives extends GameObjectGroup {
  private _currentLives: number;
  private readonly distancePosition: Vector = new Vector(-50, 0);
  private readonly initialScale: Vector = new Vector(60, 30);
  private readonly distanceFromTop = 40;
  private readonly distanceFromRight = 100;

  constructor(game: Game, startLives: number) {
    super(game);
    this._currentLives = startLives;
    const position = new Vector(
      game.boundary.x - this.distanceFromRight,
      this.distanceFromTop
    );
    this.transform.transfer(position);

    //add the player lives
    for (let i = 0; i < startLives; i++) {
      const liveTransform = new Transform(
        this.initialScale,
        this.distancePosition.mult(i)
      );
      const newLive: PlayerLive = new PlayerLive(game, liveTransform, i);
      this.addChild(newLive);
    }
  }

  public decreaseLive(): void {
    this._currentLives--;
    const gameObjectToRemove = this.findChilds(PlayerLive).find(go=>go.index==this._currentLives);
    if (gameObjectToRemove) {
      this.game.destroy(gameObjectToRemove.id);
    }
    const manager = this.game.findGameObjectByType(GameManager)
    if(!manager){
        throw new Error(GAME_MANAGER_NOT_FOUND)
    }
    if(this._currentLives==0){
        manager.gameOver(false)
    }
    else{
        manager.killPlayer()
    }
  }
}
