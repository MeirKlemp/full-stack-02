import { GAME_OBJECT_ERROR } from "../../../errors.js";
import Component from "../Component.js";
export default class Resizable extends Component {
    /**
     * Resize the element
     * @param scale The new size of the element
     */
    resize(scale) {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        this._gameObject.transform.resize(scale);
    }
}
