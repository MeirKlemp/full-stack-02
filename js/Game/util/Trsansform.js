import Component from "../components/Component.js";
import Vector from "./Vector.js";
import Resizable from "../components/visual/Resizeble.js";
export default class Transform extends Component {
    get position() {
        return this._position;
    }
    get scale() {
        return this._scale;
    }
    get rotation() {
        return this._rotation;
    }
    transfer(movement) {
        this._position = this._position.add(movement);
    }
    resize(newSize) {
        this._scale = newSize;
        if (this._gameObject != null) {
            this._gameObject.getComponents(Resizable).forEach(r => r.resize(this.scale));
        }
    }
    rotate(angle) {
        this._rotation = this._rotation.add(angle);
    }
    set position(newPosition) {
        this._position = newPosition;
    }
    constructor(scale = new Vector(1, 1), position = Vector.zero, rotation = Vector.zero) {
        super();
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
    }
}
