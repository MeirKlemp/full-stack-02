import Component from "../Component.js";
import Vector from "../../util/Vector.js";
import Displayable from "./Displayable.js";
import Sprite from "./Sprite.js";
import { GAME_OBJECT_ERROR } from "../../../errors.js";



/**
 * Presents animation for animating GameObjects
 */
export default class Animation extends Displayable {
  /**
   * The time between each sprite change
   */
  private _timeBetweenFrames: number;
  /**
   * The time when the component has created
   */
  private _startTime = new Date().getMilliseconds();
  /**
   * The paths of all the images
   */
  private _imagesPaths:string[];
  /**
   * the name of the animation
   */
  private _name:string;

  /**
   * Create new anumation
   * @param sprites The sprites for the anumation
   * @param timeBetweenFrames The time between each sprite change in MS
   */
  constructor( name:string = "untitled animation",timeBetweenFrames: number = 1000,...imagesPaths:string[]) {
    super();
    this._imagesPaths = imagesPaths
    this._name = name
    const sprites:Sprite[] = []
    for(const path of imagesPaths){

    }
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
    if(this._gameObject==null){
      throw new Error(GAME_OBJECT_ERROR)
    }
    const timeFromStart: number =
      new Date().getMilliseconds() - this._startTime;
    const imageIndex:number = (timeFromStart / this._timeBetweenFrames) % this._imagesPaths.length
    const path:string =  this._imagesPaths[imageIndex];
    const currentSprite = new Sprite(this._name+imageIndex,path)
    currentSprite.register(this._gameObject)
    return currentSprite
  }

  public displayData(): string {
    return this.getCurrenSprite().displayData();
  }

  /**
   * Get the current sprite of the animation
   * @returns The current sprite to render in the animation
   */
  public get currentSprite():Sprite{
    return this.getCurrenSprite()
  }
}
