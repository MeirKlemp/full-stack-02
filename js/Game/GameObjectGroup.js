import GameObject from "./GameObject.js";
import Vector from "./util/Vector.js";
export default class GameObjectGroup extends GameObject {
    constructor(game, transform) {
        super(game, transform);
        this._childs = [];
    }
    addChild(gameObject) {
        gameObject.transform.transfer(this.transform.position);
        const scale = this.transform.scale;
        const goScale = gameObject.transform.scale;
        gameObject.transform.resize(new Vector(scale.x * goScale.x, scale.y * goScale.y));
        this._childs.push(gameObject);
    }
    destroy() {
        this._childs.forEach((c) => c.destroy());
    }
    componentUpdate() {
        this._childs.forEach((ch) => ch.componentUpdate());
    }
    earlyUpdate() {
        this._childs.forEach((ch) => ch.earlyUpdate());
    }
    update() {
        this._childs.forEach((ch) => ch.update());
    }
    lateUpdate() {
        this._childs.forEach((ch) => ch.lateUpdate());
    }
    start() {
        this._childs.forEach((ch) => ch.start());
    }
    findChild(gameObjectType) {
        return this._childs.find((c) => c instanceof gameObjectType);
    }
    findChilds(gameObjectsType) {
        return this._childs.filter((c) => c instanceof gameObjectsType);
    }
    getAllComponents(componentType) {
        return this._childs.reduce((prev, next) => [
            ...prev,
            ...next.getAllComponents(componentType),
        ], []);
    }
    find(predicate) {
        for (const go of this._childs) {
            if (go instanceof GameObjectGroup) {
                const groupResults = go.find(predicate);
                if (groupResults != undefined) {
                    return groupResults;
                }
            }
            if (predicate(go)) {
                return go;
            }
        }
    }
    filter(predicate) {
        let filtered = [];
        for (const go of this._childs) {
            if (go instanceof GameObjectGroup) {
                filtered = [...filtered, ...go.filter(predicate)];
            }
            if (predicate(go)) {
                filtered.push(go);
            }
        }
        return filtered;
    }
    applyFilter(predicate) {
        const newChilds = [];
        for (const go of this._childs) {
            if (go instanceof GameObjectGroup) {
                go.applyFilter(predicate);
            }
            if (predicate(go)) {
                newChilds.push(go);
            }
        }
        this._childs = newChilds;
    }
    get childs() {
        return this._childs;
    }
}
