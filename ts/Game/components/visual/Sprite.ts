import Component from "../Component";
import Vector from "../../util/Vector";
import Displayable from "./Displayable";
import { GAME_OBJECT_ERROR } from "../../../errors";

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
   * the image tag
   */
  private _img: HTMLImageElement;
  /**
   * create new sprite
   * @param name The name of the sprite
   * @param imgSrc The image path of the sprite
   */
  constructor(name: string, imgSrc: string) {
    super();
    this._name = name;
    this._imgSrc = imgSrc;
    this._img = new Image();
    this._img.src = this._imgSrc;
  }

  get position(): Vector {
    if(this._gameObject==null){
      throw new Error(GAME_OBJECT_ERROR);
    }
    return this._gameObject.transform.position;
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

  /**
   * the image of the sprite
   */
  public get image(): HTMLImageElement {
    return this._img;
  }

  public displayData(): HTMLImageElement {
    return this._img;
  }

  public get scale(): Vector {
    if(this._gameObject==null){
      throw new Error(GAME_OBJECT_ERROR);
    }
    return this._gameObject.transform.scale;
  }
}
