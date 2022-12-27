import Component from "../../Component.js";
import Transform from "../../../util/Trsansform.js";
import Displayable from "../Displayable.js";
import Game from "../../../gameEngine/Game.js";

export default class Renderer extends Component {
  /**
   * the item to display
   */
  protected _displayItem: Displayable;

  constructor(displayItem: Displayable) {
    super();
    this._displayItem = displayItem;
  }

  /**
   * the transform of the renderer (for getting the place of rendering)
   */
  protected get transform():Transform{
    if(this._gameObject==null){
      return new Transform();
    }
    return this._gameObject.transform;
  }

  /**
   * the game that the renderer attached to
   */
  protected get game():Game{
    if(this._gameObject==null){
      throw new Error("component must have GameObject")
    }
    return this._gameObject.game
  }

  /**
   * render the element to the screen
   * @param context the 2d context of the canvas
   */
  public render(context:CanvasRenderingContext2D):void{
    throw new Error("Render not implamented.")
  }

}
