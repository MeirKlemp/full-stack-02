import Component from "../Component";
import AudioClip from "./AudioClip";

export default class AudioPlayer extends Component{
    private _clips:{[key:string]:AudioClip} = {}
    private _currentClip:AudioClip|null = null
    private _volume:number = 1;
    private _isLoop:boolean = false;

    constructor(){
        super();
    }

    public addClip(name:string,clipPath:string){
        this._clips[name] = new AudioClip(name,clipPath);
    }

    public playClip(name:string){
        this._currentClip?.stop();
        this._currentClip = this._clips[name]
        this._currentClip.setVolume(this._volume)
        this._currentClip.loop = this._isLoop
        this._currentClip.play();
    }

    public setVolume(volume:number):void{
        this._volume = volume;
        this._currentClip?.setVolume(this._volume)
    }

    public get loop():boolean{
        return this._isLoop;
    }

    public set loop(isLoop:boolean){
        this._isLoop = isLoop;
        if(this._currentClip!=null){
            this._currentClip.loop = isLoop;
        }
    }

    public destroy(): void {
        Object.keys(this._clips).forEach(k=>this._clips[k].destroy());
    }

    
}