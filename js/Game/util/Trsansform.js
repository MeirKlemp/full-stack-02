import Component from "../components/Component";
import Vector from "./Vector";
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
    }
    rotate(angle) {
        this._rotation = this._rotation.add(angle);
    }
    constructor(scale = new Vector(1, 1), position = Vector.zero, rotation = Vector.zero) {
        super();
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
    }
}
