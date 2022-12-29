import Color from "../../util/Color.js";
import Displayable from "./Displayable.js";


export default class Solid extends Displayable{

    private _color:Color

    constructor(color:Color){
        super()
        this._color = color
    }

    public displayData(): string {
        return this._color.color
    }
}