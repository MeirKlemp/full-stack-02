import Drawer from "./Drawer";
export default class Game {
    constructor() {
        this._gameObjects = [];
        this._drawer = new Drawer();
        //TODO :: get the drawer canvas
    }
    addGameObject(gameObject) {
        this._gameObjects.push(gameObject);
    }
    start() {
        this._gameObjects.forEach(go => {
            go.start();
        });
    }
    update() {
        this._gameObjects.forEach(go => go.update());
    }
    destroy(id) {
        var _a;
        (_a = this._gameObjects.find(go => go.id == id)) === null || _a === void 0 ? void 0 : _a.destroy();
        this._gameObjects = this._gameObjects.filter(go => go.id == id);
    }
    findGameObjectById(id) {
        return this._gameObjects.find(go => go.id == id);
    }
    findGameObject(predicate) {
        return this._gameObjects.find(predicate);
    }
}
Game.fps = 60;
