import Component from "../../Component.js";
import Transform from "../../../util/Trsansform.js";
export default class Renderer extends Component {
    constructor(displayItem) {
        super();
        this._displayItem = displayItem;
    }
    /**
     * the transform of the renderer (for getting the place of rendering)
     */
    get transform() {
        if (this._gameObject == null) {
            return new Transform();
        }
        return this._gameObject.transform;
    }
    /**
     * the game that the renderer attached to
     */
    get game() {
        if (this._gameObject == null) {
            throw new Error("component must have GameObject");
        }
        return this._gameObject.game;
    }
    /**
     * render the element to the screen
     * @param context the 2d context of the canvas
     */
    render(context) {
        throw new Error("Render not implamented.");
    }
}
