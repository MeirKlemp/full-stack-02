import Component from "../Component";
import Transform from "../../util/Trsansform";
import Displayable from "./Displayable";
import Game from "../../gameEngine/Game";

export default class Renderer extends Component {
  /**
   * the item to display
   */
  private _displayItem: Displayable;

  constructor(displayItem: Displayable) {
    super();
    this._displayItem = displayItem;
  }

  private get transform():Transform{
    if(this._gameObject==null){
      return new Transform();
    }
    return this._gameObject.transform;
  }

  private get game():Game{
    if(this._gameObject==null){
      throw new Error("component must have GameObject")
    }
    return this._gameObject?.game
  }

  public init(){
    
  }
}
