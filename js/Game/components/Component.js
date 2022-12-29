import { GAME_OBJECT_ERROR } from "../../errors.js";
import uuid from "../../tools/uuid.js";
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
    get gameObject() {
        if (!this._gameObject) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        return this._gameObject;
    }
    componentUpdate() { }
}
