import { GAME_MANAGER_NOT_FOUND } from "../../errors.js";
import AudioClip from "../../Game/components/audio/AudioClip.js";
import AudioPlayer from "../../Game/components/audio/AudioPlayer.js";
import BoxCollider from "../../Game/components/colliders/BoxCollider.js";
import SolidRenderer from "../../Game/components/visual/renderers/SolidRenderer.js";
import Solid from "../../Game/components/visual/Solid.js";
import Game from "../../Game/gameEngine/Game.js";
import GameObject from "../../Game/GameObject.js";
import Color from "../../Game/util/Color.js";
import Vector from "../../Game/util/Vector.js";
import GameManager from "./GameManager.js";

export default class Bullet extends GameObject{
    private _enemySource:boolean
    private _speed:number

    constructor(game:Game,position:Vector,isEnemy:boolean,speed:number){
        super(game)
        this.transform.transfer(position)
        this.transform.resize(new Vector(4,15))
        this._enemySource = isEnemy
        this._speed = speed
        const solid = new Solid(Color.WHITE)
        this.addComponent(solid)
        this.addComponent(new SolidRenderer(solid))
        const gameManager = game.findGameObjectByType(GameManager)
        if(!gameManager){
            throw new Error(GAME_MANAGER_NOT_FOUND)
        }
        gameManager.canPlayerShoot = false

        //add teh voice to the bullet
        if(!this._enemySource){
            const player = new AudioPlayer()
            this.addComponent(player)
            player.addClip("shot","../../../audio/space-invaders/bullet1.wav")
            player.playClip("shot")
            player.loop = false
        }

        //add the collider to the bullet
        const collider = new BoxCollider(Vector.zero,this.transform.scale)
        collider.isTrigger = true
        this.addComponent(collider)


    }
    
    public earlyUpdate():void{
        if(this.transform.position.y<0|| this.transform.position.y>this.game.boundary.y){
            const gameManager = this.game.findGameObjectByType(GameManager)
            if(!gameManager){
                throw new Error(GAME_MANAGER_NOT_FOUND)
            }
            this.game.destroy(this.id)
        }
    }

    public update():void{
        let movemenmt = this._enemySource?Vector.down:Vector.up
        movemenmt = movemenmt.mult(this._speed)
        this.transform.transfer(movemenmt)
    }

    public get speed():number{
        return this._speed
    }

    public set speed(value:number){
        this._speed = value
    }

    public destroy():void{
        const manager = this.game.findGameObjectByType(GameManager)
        if(!manager){
            throw new Error(GAME_MANAGER_NOT_FOUND)
        }
        if(!this._enemySource){
            manager.canPlayerShoot = true
        }
        super.destroy()
        
    }

    /**
     * is the bullet is bullet of teh enemy
     */
    public get enemyBullet():boolean{
        return this._enemySource
    }
}
