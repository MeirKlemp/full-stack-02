import { GAME_OBJECT_ERROR } from "../../../errors.js";
import Vector from "../../util/Vector.js";
import Resizable from "./Resizeble.js";

export default class Displayable extends Resizable {
  /**
   *
   * @returns The image to diplay now
   */
  displayData(): string{
    throw new Error("Display Data funciton not implemented")
  }
  /**
   * get the scale of the data to display in px
   */
  get scale(): Vector{
    if(this._gameObject==null){
      throw new Error(GAME_OBJECT_ERROR)
    }
    return this._gameObject.transform.scale
  }

  /**
   * the position of the object to display
   */
  get position():Vector{
    if(this._gameObject == null){
      throw new Error(GAME_OBJECT_ERROR)
    }
    return this._gameObject.transform.position
  }
}
