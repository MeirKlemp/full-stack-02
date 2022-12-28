import { GAME_MANAGER_NOT_FOUND } from "../../errors.js";
import GameObject from "../../Game/components/GameObject.js";
import Game from "../../Game/gameEngine/Game.js";
import Transform from "../../Game/util/Trsansform.js";
import GameManager from "./GameManager.js";


export default class Enemy extends GameObject{
    protected _scores:number = 0;
    protected _speed:number = 0;
    protected _movingLeft:boolean = false
    protected _gameManager:GameManager
    
    
    /**
     * create new Enemy unit
     * @param game the game that the unit will be attached to
     * @param transform the initial transform of the unit
     */
    protected constructor(game:Game,transform:Transform){
        super(game,transform)
        const gm = game.findGameObjectByType(GameManager)
        if(gm==null){
            throw new Error(GAME_MANAGER_NOT_FOUND)
        }
        this._gameManager = gm
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
        this._scores = this.scores
    }

}