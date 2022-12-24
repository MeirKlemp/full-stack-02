import Component from "../components/Component";
/**
 * Presents animation for animating GameObjects
 */
export default class Animation extends Component {
    /**
     * Create new anumation
     * @param sprites The sprites for the anumation
     * @param timeBetweenFrames The time between each sprite change in MS
     */
    constructor(sprites, timeBetweenFrames = 1000) {
        super();
        /**
         * The time when the component has created
         */
        this._startTime = new Date().getMilliseconds();
        /**
         * is the anumation paused
         */
        this._isPaused = false;
        this._sprites = sprites;
        this._timeBetweenFrames = timeBetweenFrames;
    }
    get scale() {
        return this._sprites[0].scale;
    }
    set scale(size) {
        this._sprites.forEach((s) => (s.scale = size));
    }
    /**
     *
     * @returns The sprite to display at the current time
     */
    getCurrenSprite() {
        const timeFromStart = new Date().getMilliseconds() - this._startTime;
        return this._sprites[(timeFromStart / this._timeBetweenFrames) % this._sprites.length];
    }
    /**
     * Destroy the animation component
     */
    destroy() {
        this._sprites.forEach((s) => s.destroy());
    }
    displayData() {
        return this.getCurrenSprite().image;
    }
}
