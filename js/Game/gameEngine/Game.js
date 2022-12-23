import Drawer from "./Drawer";
export default class Game {
    constructor() {
        this._gameObjects = [];
        this._drawer = new Drawer(); //TODO :: get the drawer canvas
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
    destroy(gameObject) {
        this._gameObjects = this._gameObjects.filter(go => go.id);
    }
}
Game.fps = 60;
