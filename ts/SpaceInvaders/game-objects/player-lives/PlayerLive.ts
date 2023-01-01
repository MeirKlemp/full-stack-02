import ImageRenderer from "../../../Game/components/visual/renderers/ImageRenderer.js";
import Sprite from "../../../Game/components/visual/Sprite.js";
import Game from "../../../Game/gameEngine/Game.js";
import GameObject from "../../../Game/GameObject.js";
import Transform from "../../../Game/util/Trsansform.js";


export default class PlayerLive extends GameObject{
    
    private _index:number

    constructor(game:Game,transform:Transform,index:number){
        super(game,transform)
        this._index = index
        //add the sprite of the spaceship
        const sprite = new Sprite("player-hp","../../../../images/space-invaders/player.png")
        this.addComponent(sprite)
        this.addComponent(new ImageRenderer(sprite))
    }

    public get index():number{
        return this._index
    }
}