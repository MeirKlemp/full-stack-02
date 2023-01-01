import Renderer from "../components/visual/renderers/Renderer.js";
import Vector from "../util/Vector.js";
import GameObjectGroup from "../GameObjectGroup.js";
import Transform from "../util/Trsansform.js";
export default class Game {
    constructor(drawer, initFunction) {
        this._gameObjects = new GameObjectGroup(this, new Transform(new Vector(1, 1)));
        this._drawer = drawer;
        this._boundary = this._drawer.boundary;
        if (initFunction != null) {
            this.init(initFunction);
        }
    }
    addGameObject(gameObject) {
        this._gameObjects.addChild(gameObject);
    }
    start() {
        this._gameObjects.start();
    }
    get drawer() {
        return this._drawer;
    }
    update() {
        this._gameObjects.update();
    }
    //   public onInput(input: string): void {
    //     this._gameObjects.onInput(input)
    //   }
    drawScreen() {
        const renderers = this._gameObjects.getAllComponents(Renderer);
        this.drawer.drawScreen(renderers);
    }
    lateUpdate() {
        this._gameObjects.lateUpdate();
    }
    earlyUpdate() {
        document.addEventListener("keydown", (e) => {
            e.preventDefault();
            Game.keyboardData[e.code] = true;
        });
        document.addEventListener("keyup", (e) => {
            e.preventDefault();
            Game.keyboardData[e.code] = false;
        });
        this._gameObjects.earlyUpdate();
    }
    destroy(id) {
        var _a;
        (_a = this._gameObjects.find((go) => go.id == id)) === null || _a === void 0 ? void 0 : _a.destroy();
        this._gameObjects.applyFilter((go) => go.id != id);
    }
    findGameObjectById(id) {
        return this._gameObjects.find((go) => go.id == id);
    }
    findGameObject(predicate) {
        return this._gameObjects.find(predicate);
    }
    init(initFunction) {
        initFunction(this);
    }
    /**
     * get one game object with the given type
     * @param gameObjectType the type of the game object to find
     * @returns game object with the ginving type or null if not founded
     */
    findGameObjectByType(gameObjectType) {
        return this._gameObjects.find((go) => go instanceof gameObjectType);
    }
    /**
     * Get all the game objects with the given type
     * @param gameObjectsType the type of the game objects to find
     * @returns all the game objects with the given type
     */
    findGameObjectsByType(gameObjectsType) {
        return this._gameObjects.filter((go) => go instanceof gameObjectsType);
    }
    /**
     * the boundary of the game
     */
    get boundary() {
        return this._boundary;
    }
    /**
     * run the component update for all the game objects
     */
    componentUpdate() {
        this._gameObjects.componentUpdate();
    }
    /**
     * saves data to the locale storage
     * @param key the key of the data
     * @param value wha twe want to save in the locale storage
     */
    saveState(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    /**
     * lods game data from the locale storage
     * @param key the key of the data in the locale storage
     * @returns the stored object
     */
    loadState(key) {
        const res = localStorage.getItem(key);
        if (!res) {
            return res;
        }
        return JSON.parse(res);
    }
    static getInput(keyCode) {
        return Game.keyboardData[keyCode];
    }
    /**
     * the root game object
     */
    get rootGameObject() {
        return this._gameObjects;
    }
    /**
     *restart the game
     */
    restart() {
        location.reload();
    }
}
Game.fps = 60;
Game.keyboardData = [];
Game.deltaTime = 1 / Game.fps;
