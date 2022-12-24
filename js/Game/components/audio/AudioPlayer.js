import Component from "../Component";
import AudioClip from "./AudioClip";
export default class AudioPlayer extends Component {
    constructor() {
        super();
        this._clips = {};
        this._currentClip = null;
        this._volume = 1;
        this._isLoop = false;
    }
    addClip(name, clipPath) {
        this._clips[name] = new AudioClip(name, clipPath);
    }
    playClip(name) {
        var _a;
        (_a = this._currentClip) === null || _a === void 0 ? void 0 : _a.stop();
        this._currentClip = this._clips[name];
        this._currentClip.setVolume(this._volume);
        this._currentClip.loop = this._isLoop;
        this._currentClip.play();
    }
    setVolume(volume) {
        var _a;
        this._volume = volume;
        (_a = this._currentClip) === null || _a === void 0 ? void 0 : _a.setVolume(this._volume);
    }
    get loop() {
        return this._isLoop;
    }
    set loop(isLoop) {
        this._isLoop = isLoop;
        if (this._currentClip != null) {
            this._currentClip.loop = isLoop;
        }
    }
    destroy() {
        Object.keys(this._clips).forEach(k => this._clips[k].destroy());
    }
}
