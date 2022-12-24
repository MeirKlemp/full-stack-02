import Component from "../Component";
import Vector from "../../util/Vector";
import Displayable from "./Displayable";
import Sprite from "./Sprite";
import { GAME_OBJECT_ERROR } from "../../../errors";



/**
 * Presents animation for animating GameObjects
 */
export default class Animation extends Component implements Displayable {
  /**
   * The sprites of the animations
   */
  private _sprites: Sprite[];
  /**
   * The time between each sprite change
   */
  private _timeBetweenFrames: number;
  /**
   * The time when the component has created
   */
  private _startTime = new Date().getMilliseconds();
  /**
   * is the anumation paused
   */
  private _isPaused: boolean = false;

  /**
   * Create new anumation
   * @param sprites The sprites for the anumation
   * @param timeBetweenFrames The time between each sprite change in MS
   */
  constructor(sprites: Sprite[], timeBetweenFrames: number = 1000) {
    super();
    this._sprites = sprites;
    this._timeBetweenFrames = timeBetweenFrames;
  }
  public get position(): Vector {
    if(this._gameObject==null){
      throw new Error(GAME_OBJECT_ERROR);
    }
    return this._gameObject.transform.position;
  }

  public get scale(): Vector {
    if(this._gameObject==null){
      throw new Error(GAME_OBJECT_ERROR)
    }
    return this._gameObject.transform.scale
  }

  /**
   *
   * @returns The sprite to display at the current time
   */
  private getCurrenSprite(): Sprite {
    const timeFromStart: number =
      new Date().getMilliseconds() - this._startTime;
    return this._sprites[
      (timeFromStart / this._timeBetweenFrames) % this._sprites.length
    ];
  }

  /**
   * Destroy the animation component
   */
  public destroy(): void {
    this._sprites.forEach((s) => s.destroy());
  }

  public displayData(): HTMLImageElement {
    return this.getCurrenSprite().image;
  }
}
