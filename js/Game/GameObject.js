import uuid from "../tools/uuid.js";
import Transform from "./util/Trsansform.js";
export default class GameObject {
    /**
     * craete new game object
     * @param game The game
     * @param transfrom the game object transform
     */
    constructor(game, transfrom = new Transform()) {
        this._id = uuid();
        this._components = [];
        this.addComponent(transfrom);
        this._game = game;
    }
    /**
     * Add component to the game object
     * @param component The component to add to the game object
     */
    addComponent(component) {
        component.register(this);
        this._components.push(component);
    }
    /**
     * the game object id
     */
    get id() {
        return this._id;
    }
    /**
     * execute before each frame draw in the game
     */
    update() {
    }
    /**
     * execute on the start of the game
     */
    start() {
    }
    /**
     * destroy the game object
     */
    destroy() {
        this._components.forEach(c => c.destroy());
    }
    /**
     * The object of the game
     */
    get game() {
        return this._game;
    }
    /**
     * the transform of the game object
     */
    get transform() {
        return this._components.find(c => c instanceof Transform);
    }
    /**
     * Remove and destroy component form the game object
     * @param componentId the id of the component to remove
     */
    removeComponent(componentId) {
        var _a;
        (_a = this._components.find(c => c.id == componentId)) === null || _a === void 0 ? void 0 : _a.destroy();
        this._components = this._components.filter(c => c.id != componentId);
    }
    /**
     * Get first component of the game object with a given type
     * @param componentType the type of the component to get
     * @returns the component of the game object with the lgiven type
     */
    getComponent(componentType) {
        return this._components.find(c => c instanceof componentType);
    }
    /**
     * Get all the components of a game object with a given type
     * @param componentsType The type of the components to get
     * @returns the components og the game object
     */
    getComponents(componentsType) {
        return this._components.filter(c => c instanceof componentsType).map(c => c);
    }
    /**
     * Late update
     * execute after each frame draw
     */
    lateUpdate() {
    }
    /**
     * Early update
     * execute before the normal update
     */
    earlyUpdate() {
    }
    /**
     * update all teh components
     */
    componentUpdate() {
        this._components.forEach(c => c.componentUpdate());
    }
    getAllComponents(componentType) {
        return this.getComponents(componentType);
    }
}
