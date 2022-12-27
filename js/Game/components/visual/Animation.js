import Displayable from "./Displayable.js";
import Sprite from "./Sprite.js";
import { GAME_OBJECT_ERROR } from "../../../errors.js";
/**
 * Presents animation for animating GameObjects
 */
export default class Animation extends Displayable {
    /**
     * Create new anumation
     * @param sprites The sprites for the anumation
     * @param timeBetweenFrames The time between each sprite change in MS
     */
    constructor(name = "untitled animation", timeBetweenFrames = 1000, ...imagesPaths) {
        super();
        /**
         * The time when the component has created
         */
        this._startTime = new Date().getMilliseconds();
        this._imagesPaths = imagesPaths;
        this._name = name;
        const sprites = [];
        for (const path of imagesPaths) {
        }
        this._timeBetweenFrames = timeBetweenFrames;
    }
    get position() {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        return this._gameObject.transform.position;
    }
    get scale() {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        return this._gameObject.transform.scale;
    }
    /**
     *
     * @returns The sprite to display at the current time
     */
    getCurrenSprite() {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        const timeFromStart = new Date().getMilliseconds() - this._startTime;
        const imageIndex = (timeFromStart / this._timeBetweenFrames) % this._imagesPaths.length;
        const path = this._imagesPaths[imageIndex];
        const currentSprite = new Sprite(this._name + imageIndex, path);
        currentSprite.register(this._gameObject);
        return currentSprite;
    }
    displayData() {
        return this.getCurrenSprite().displayData();
    }
    /**
     * Get the current sprite of the animation
     * @returns The current sprite to render in the animation
     */
    get currentSprite() {
        return this.getCurrenSprite();
    }
}
