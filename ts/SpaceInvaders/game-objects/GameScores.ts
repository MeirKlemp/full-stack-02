import GameObject from "../../Game/components/GameObject.js";
import TextRenderer from "../../Game/components/visual/renderers/TextRenderer.js";
import TextBlock from "../../Game/components/visual/Text.js";
import Game from "../../Game/gameEngine/Game.js";
import Color from "../../Game/util/Color.js";
import Transform from "../../Game/util/Trsansform.js";
import Vector from "../../Game/util/Vector.js";
import $ from "../../tools/fastAccess.js";

const scoresLabel = "S C O R E"

export default class GameScores extends GameObject{
    private _scores:number = 0
    
    constructor(game:Game,transform?:Transform){
        super(game,transform)
        const size = 40
        const textBlock = new TextBlock("0",Color.WHITE,size,"ArcadeClassic")
        this.addComponent(textBlock)
        this.addComponent(new TextRenderer(textBlock,Vector.down.mult(size)))
        const scoreTitleBlock = new TextBlock(scoresLabel,Color.WHITE,size,"ArcadeClassic")
        this.addComponent(scoreTitleBlock)
        this.addComponent(new TextRenderer(scoreTitleBlock))

    }

    public get scores():number{
        return this._scores
    }

    public set scores(_scores:number){
        this._scores = _scores
    }

    public update(): void {
        super.update();
        
        const text = this.getComponent(TextBlock);
        if(text!=null){
            text.text = this.format;
        }
    }

    private get format():string{
        const str = String(this._scores).padStart(4,'0');
        return str.replace(/(\d)/gi,"$1  ")
    }

    
}