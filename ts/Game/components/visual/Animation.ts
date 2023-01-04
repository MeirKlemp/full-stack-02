import Vector from "../../util/Vector.js";
import Displayable from "./Displayable.js";
import Sprite from "./Sprite.js";
import { GAME_OBJECT_ERROR } from "../../../errors.js";
import ImageVisulizer from "./ImageVisualizer.js";
import GameObject from "../../GameObject.js";
import Game from "../../gameEngine/Game.js";



type animationChangeEvent = (self:Animation) =>void

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

  private _onAnimationChange:animationChangeEvent[] = []

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

  /**
   * the time betwee two frames in seconds
   */
  public get timeBetweenFrames():number{
    return this._timeBetweenFrames;
  }

  /**
   * the time betwee two frames in seconds
   */
  public set timeBetweenFrames(seconds:number){
    this._timeBetweenFrames = seconds
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

  /**
   * update each frame iteration
   */
  public componentUpdate():void{
    const prevSprite = this.getCurrenSprite()
    this._currentTime+=Game.deltaTime
    //invoke the on animation change events if the animation has changed
    if(this.currentSprite.id!=prevSprite.id){
      this._onAnimationChange.forEach(e=>e(this))
    }
  }


  /**
   * Register event to invoke when the animation changed
   * @param e The function to run when the animation changed
   */
  public registerAnimationChangeEvent(e:animationChangeEvent){
    this._onAnimationChange.push(e)
  }
}
