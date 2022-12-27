import Renderer from "../components/visual/renderers/Renderer.js";
export default class Game {
    constructor(drawer, initFunction) {
        this._gameObjects = [];
        this._drawer = drawer;
        this.init(initFunction);
    }
    addGameObject(gameObject) {
        this._gameObjects.push(gameObject);
    }
    start() {
        this._gameObjects.forEach(go => {
            go.start();
        });
    }
    get drawer() {
        return this._drawer;
    }
    update() {
        this._gameObjects.forEach(go => go.update());
    }
    drawScreen() {
        const renderers = this._gameObjects.reduce((prev, go) => [...prev, ...go.getComponents(Renderer)], []);
        this.drawer.drawScreen(renderers);
    }
    lateUpdate() {
        this._gameObjects.forEach(go => go.lateUpdate());
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
    init(initFunction) {
        initFunction(this);
    }
}
Game.fps = 60;
Game.deltaTime = 1000 / Game.fps;
