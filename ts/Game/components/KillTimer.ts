import Game from "../gameEngine/Game.js";
import Component from "./Component.js";

export default class KillTimer extends Component{
    private _remainingTime: number;


    /**
     * create new kill timer
     * @param time the time befor the game object destruction
     */
    constructor(time:number){
        super()
        this._remainingTime = time
    }

    public get remainingTime(): number {
        return this._remainingTime;
    }
    public set remainingTime(value: number) {
        this._remainingTime = value;
    }

    public componentUpdate(): void {
        this._remainingTime-=Game.deltaTime
        if(this._remainingTime<=0){
            const myObject = this.gameObject
            if(myObject){
                myObject.game.destroy(myObject.id)
            }
        }
    }
}