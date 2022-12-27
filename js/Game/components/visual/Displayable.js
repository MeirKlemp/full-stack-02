import { GAME_OBJECT_ERROR } from "../../../errors.js";
import Resizable from "./Resizeble.js";
export default class Displayable extends Resizable {
    /**
     *
     * @returns The image to diplay now
     */
    displayData() {
        throw new Error("Display Data funciton not implemented");
    }
    /**
     * get the scale of the data to display in px
     */
    get scale() {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        return this._gameObject.transform.scale;
    }
    /**
     * the position of the object to display
     */
    get position() {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        return this._gameObject.transform.position;
    }
}
