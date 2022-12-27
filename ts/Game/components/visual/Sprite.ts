import Component from "../Component.js";
import Vector from "../../util/Vector.js";
import Displayable from "./Displayable.js";
import { GAME_OBJECT_ERROR } from "../../../errors.js";

export default class Sprite extends Component implements Displayable {
  /**
   * The path of the image
   */
  private _imgSrc: string;
  /**
   * the sprite name
   */
  private _name: string;
  /**
   * create new sprite
   * @param name The name of the sprite
   * @param imgSrc The image path of the sprite
   */
  constructor(name: string, imgSrc: string) {
    super();
    this._name = name;
    this._imgSrc = imgSrc;

  }

  get position(): Vector {
    if(this._gameObject==null){
      throw new Error(GAME_OBJECT_ERROR);
    }
    return this._gameObject.transform.position;
  }

  resize(scale: Vector): void {
    if(this._gameObject==null){
      throw new Error(GAME_OBJECT_ERROR)
    }
    this._gameObject.transform.resize(scale)
  }

  /**
   * the sorce of the image of the sprite
   */
  public get source(): string {
    return this._imgSrc;
  }

  /**
   * the name of the sprite
   */
  public get name(): string {
    return this._name;
  }

  public displayData(): string {
    return this._imgSrc;
  }

  public get scale(): Vector {
    if(this._gameObject==null){
      throw new Error(GAME_OBJECT_ERROR);
    }
    return this._gameObject.transform.scale;
  }
}
