import uuid from "../../tools/uuid";
export default class Component {
    constructor() {
        this._id = uuid();
        this._gameObject = null;
    }
    get id() {
        return this._id;
    }
    register(gameObject) {
        this._gameObject = gameObject;
    }
    invoke() {
    }
}
Component.lastId = 0;
