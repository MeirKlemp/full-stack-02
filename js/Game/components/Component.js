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
    destroy() {
    }
    selfDestroy() {
        var _a;
        (_a = this._gameObject) === null || _a === void 0 ? void 0 : _a.removeComponent(this._id);
    }
}
