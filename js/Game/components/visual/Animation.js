import Displayable from "./Displayable.js";
import Sprite from "./Sprite.js";
import { GAME_OBJECT_ERROR } from "../../../errors.js";
import Game from "../../gameEngine/Game.js";
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
        /**
         * the current time of the animation
         */
        this._currentTime = 0;
        this._name = name;
        this._sprites = [];
        for (let i = 0; i < imagesPaths.length; i++) {
            const sprite = new Sprite(`${name}_${i}`, imagesPaths[i]);
            this._sprites.push(sprite);
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
        const imageIndex = Math.floor(this._currentTime / this._timeBetweenFrames) % this._sprites.length;
        const currentSprite = this._sprites[imageIndex];
        return currentSprite;
    }
    displayData() {
        return this.getCurrenSprite().displayData();
    }
    /**
     * the image to display now
     */
    get image() {
        return this.getCurrenSprite().image;
    }
    /**
     * Get the current sprite of the animation
     * @returns The current sprite to render in the animation
     */
    get currentSprite() {
        return this.getCurrenSprite();
    }
    register(gameObject) {
        super.register(gameObject);
        this._sprites.forEach(s => s.register(gameObject));
    }
    componentUpdate() {
        this._currentTime += Game.deltaTime;
    }
}
