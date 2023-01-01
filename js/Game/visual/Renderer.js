import Component from "../components/Component.js";
export default class Renderer extends Component {
    constructor(displayItem) {
        super();
        this._displayItem = displayItem;
    }
    get transform() {
        var _a;
        return (_a = this._gameObject) === null || _a === void 0 ? void 0 : _a.transform;
    }
}
