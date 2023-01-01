import Component from "../Component.js";
export default class AudioClip extends Component {
    constructor(name, clipPath, loop = false) {
        super();
        this._isLoop = false;
        this._clip = new Audio(clipPath);
        this._name = name;
        this._isLoop = loop;
    }
    get name() {
        return this._name;
    }
    play() {
        this._clip.play();
    }
    pause() {
        this._clip.pause();
    }
    stop() {
        this._clip.pause();
        this._clip.currentTime = 0;
    }
    destroy() {
        this._clip.pause();
        this._clip.remove();
    }
    setVolume(volume) {
        this._clip.volume = volume;
    }
    get loop() {
        return this._isLoop;
    }
    set loop(loop) {
        this._isLoop = loop;
    }
}
