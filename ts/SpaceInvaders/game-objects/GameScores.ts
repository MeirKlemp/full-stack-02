import GameObject from "../../Game/GameObject.js";
import TextRenderer from "../../Game/components/visual/renderers/TextRenderer.js";
import TextBlock from "../../Game/components/visual/Text.js";
import Game from "../../Game/gameEngine/Game.js";
import Color from "../../Game/util/Color.js";
import Transform from "../../Game/util/Trsansform.js";
import Vector from "../../Game/util/Vector.js";
import $ from "../../tools/fastAccess.js";


export default class GameScores extends GameObject{
    private _scores:number = 0
    private _scoresTextBlock:TextBlock
    private _titleTextBlock:TextBlock
    private _scoresText:string
    
    constructor(game:Game,transform?:Transform){
        super(game,transform)
        const size = 40
        this._scoresText = "S C O R E"
        const textBlock = new TextBlock("0",Color.WHITE,size,"ArcadeClassic")
        this._scoresTextBlock = textBlock
        this.addComponent(textBlock)
        this.addComponent(new TextRenderer(textBlock,Vector.down.mult(size)))
        const scoreTitleBlock = new TextBlock(this._scoresText,Color.WHITE,size,"ArcadeClassic")
        this._titleTextBlock = scoreTitleBlock
        this.addComponent(scoreTitleBlock)
        this.addComponent(new TextRenderer(scoreTitleBlock))

    }

    public get scores():number{
        return this._scores
    }

    public set scores(_scores:number){
        this._scores = _scores
    }

    public get title():string{
        return this._scoresText
    }

    public set title(value:string){
        this._scoresText = value
    }



    public update(): void {
        super.update();       
        this._scoresTextBlock.text = this.format
        this._titleTextBlock.text = this._scoresText
    }

    private get format():string{
        const str = String(this._scores).padStart(4,'0');
        return str.replace(/(\d)/gi,"$1  ")
    }

    
}