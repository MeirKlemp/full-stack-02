import uuid from "../../tools/uuid";
import Transform from "../util/Trsansform";
export default class GameObject {
    constructor(game, transfrom = new Transform()) {
        this._transform = transfrom;
        this._id = uuid();
        this._components = [];
    }
    addComponent(component) {
        component.register(this);
    }
    get id() {
        return this._id;
    }
    update() {
    }
    start() {
    }
}
