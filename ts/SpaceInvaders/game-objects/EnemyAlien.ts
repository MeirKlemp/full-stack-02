import { GAME_MANAGER_NOT_FOUND } from "../../errors.js";
import GameObject from "../../Game/components/GameObject.js";
import ImageRenderer from "../../Game/components/visual/renderers/ImageRenderer.js";
import Sprite from "../../Game/components/visual/Sprite.js";
import Game from "../../Game/gameEngine/Game.js";
import Transform from "../../Game/util/Trsansform.js";
import Vector from "../../Game/util/Vector.js";
import GameManager from "./GameManager.js";
import Animation from "../../Game/components/visual/Animation.js";


export default class EnemyAlien extends GameObject{
    private _scores:number = 0;
    private _speed:number = 0;
    private _gameManager:GameManager

    
    /**
     * create new Enemy unit
     * @param game the game that the unit will be attached to
     * @param transform the initial transform of the unit
     */
    constructor(game:Game,animation:Animation,transform?:Transform){
        super(game,transform)
        const gm = game.findGameObjectByType(GameManager)
        if(gm==null){
            throw new Error(GAME_MANAGER_NOT_FOUND)
        }
        this._gameManager = gm
        this.addComponent(animation)
        const renderer:ImageRenderer = new ImageRenderer(animation)
        this.addComponent(renderer)
    }

    /**
     * the unit speed
     */
    public get speed():number{
        return this._speed
    }

    /**
     * the unit speed
     */
    public set speed(value:number){
        this._speed = value
    }



    /**
     * the amount of score the player getting for killing the unit
     */
    public get scores():number{
        return this._scores
    }

    /**
     * the amount of scores the player getting for killing the unit
     */
    public set scores(value:number){
        this._scores = value
    }

    /**
     * get the next movemenmt
     */
    private get nextMovement():Vector{
        const moveLeft = this._gameManager.isMovingLeft
        const direction = moveLeft?Vector.left:Vector.right
        const expectedMovement = direction.mult(this.speed*Game.deltaTime)
        return expectedMovement
    }

    public earlyUpdate(): void {
        const nextPosition = this.nextMovement.add(this.transform.position)
        if(nextPosition.x<0||nextPosition.add(this.transform.scale).x>this.game.boundary.x){
            this._gameManager.switchSeide()
            this._gameManager.moveDown()
        }
    }

    public update(): void {
        if(this._gameManager.isMovingDown){
            this.transform.transfer(Vector.down.mult(this._gameManager.downStep))
        }
        this.transform.transfer(this.nextMovement)
    }

}