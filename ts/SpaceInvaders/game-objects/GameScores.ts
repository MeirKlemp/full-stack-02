import GameObject from "../../Game/components/GameObject";
import TextBlock from "../../Game/components/visual/Text";
import Game from "../../Game/gameEngine/Game";
import Transform from "../../Game/util/Trsansform";
import Vector from "../../Game/util/Vector";

export default class GameScores extends GameObject{
    private _scores:number = 0


    constructor(game:Game){
        super(game)
        this.transform.position = Vector.zero
        this.addComponent(new TextBlock("0"))
    }

    public get scores():number{
        return this._scores
    }

    public set scores(_scores:number){
        this._scores = _scores
    }

    public update(): void {
        super.update();
        this.scores++;
        
        const text = this.getComponent(TextBlock);
        if(text!=null){
            text.text = this.scores.toString();
        }
    }
    
}