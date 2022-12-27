import Component from "../Component.js";

export default class AudioClip extends Component {
  private _clip;
  private _name: string;
  private _isLoop: boolean = false;

  constructor(name: string, clipPath: string, loop: boolean = false) {
    super();
    this._clip = new Audio(clipPath);
    this._name = name;
    this._isLoop = loop;
  }

  public get name(): string {
    return this._name;
  }

  public play(): void {
    this._clip.play();
  }

  public pause(): void {
    this._clip.pause();
  }

  public stop(): void {
    this._clip.pause();
    this._clip.currentTime = 0;
  }

  public destroy(): void {
    this._clip.pause();
    this._clip.remove();
  }

  public setVolume(volume: number) {
    this._clip.volume = volume;
  }

  public get loop(): boolean {
    return this._isLoop;
  }

  public set loop(loop: boolean) {
    this._isLoop = loop;
  }
}
