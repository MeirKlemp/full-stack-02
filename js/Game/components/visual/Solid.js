import Displayable from "./Displayable.js";
export default class Solid extends Displayable {
    constructor(color) {
        super();
        this._color = color;
    }
    displayData() {
        return this._color.color;
    }
}
