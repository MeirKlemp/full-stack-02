import Vector from "../../util/Vector.js";
import Displayable from "./Displayable.js";
import Sprite from "./Sprite.js";
import { GAME_OBJECT_ERROR } from "../../../errors.js";
import ImageVisulizer from "./ImageVisualizer.js";
import GameObject from "../../GameObject.js";
import Game from "../../gameEngine/Game.js";



/**
 * Presents animation for animating GameObjects
 */
export default class Animation extends Displayable implements ImageVisulizer {
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
  private _sprites:Sprite[];
  /**
   * the name of the animation
   */
  private _name:string;
  /**
   * the current time of the animation
   */
  private _currentTime:number = 0

  /**
   * Create new anumation
   * @param sprites The sprites for the anumation
   * @param timeBetweenFrames The time between each sprite change in MS
   */
  constructor( name:string = "untitled animation",timeBetweenFrames: number = 1000,...imagesPaths:string[]) {
    super();
    this._name = name
    this._sprites = []
    for(let i=0;i<imagesPaths.length;i++){
      const sprite = new Sprite(`${name}_${i}`,imagesPaths[i])
      this._sprites.push(sprite)
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
    const imageIndex:number = Math.floor(this._currentTime / this._timeBetweenFrames) % this._sprites.length
    const currentSprite = this._sprites[imageIndex]
    return currentSprite
  }


  public displayData(): string {
    return this.getCurrenSprite().displayData();
  }

  /**
   * the image to display now
   */
  public get  image():HTMLImageElement{
    return this.getCurrenSprite().image
  }

  /**
   * Get the current sprite of the animation
   * @returns The current sprite to render in the animation
   */
  public get currentSprite():Sprite{
    return this.getCurrenSprite()
  }

  public register(gameObject: GameObject): void {
    super.register(gameObject)
    this._sprites.forEach(s=>s.register(gameObject))
  }

  public componentUpdate():void{
    this._currentTime+=Game.deltaTime
  }
}
