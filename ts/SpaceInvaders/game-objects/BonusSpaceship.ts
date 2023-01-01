import Game from "../../Game/gameEngine/Game.js";
import GameObject from "../../Game/GameObject.js";
import Vector from "../../Game/util/Vector.js";
import AudioPlayer from "../../Game/components/audio/AudioPlayer.js";
import Sprite from "../../Game/components/visual/Sprite.js";
import ImageRenderer from "../../Game/components/visual/renderers/ImageRenderer.js";
import BoxCollider from "../../Game/components/colliders/BoxCollider.js";
import Bullet from "./Bullet.js";
import { GAME_SCORES_NOT_FOUND } from "../../errors.js";
import GameScores from "./GameScores.js";


export default class BonusSpaceship extends GameObject{
    private _speed:number = 100
    private readonly _initialPosition:Vector = new Vector(0,120)
    public readonly scores = 100

    constructor(game:Game){
        super(game)
        //set the spaceship audio
        const audioPlayer = new AudioPlayer()
        audioPlayer.addClip("bonus","../../audio/space-invaders/bonus.wav")
        audioPlayer.loop = true
        audioPlayer.playClip("bonus")
        this.addComponent(audioPlayer)

        //set the spaceship initial transform
        this.transform.transfer(this._initialPosition)
        this.transform.resize(new Vector(80,40))

        //set the spaceship sprite
        const sprite = new Sprite("bonus","../../images/space-invaders/bonusB.png")
        this.addComponent(sprite)
        const imageRenderer = new ImageRenderer(sprite)
        this.addComponent(imageRenderer)
        
        //add box collider
        const collider = new BoxCollider(this.transform.position,this.transform.scale)
        collider.registerTriggerCollisionEvent(onTriggerEnter)
        this.addComponent(collider)
    }

    public update(): void {
        this.transform.transfer(Vector.right.mult(this._speed*Game.deltaTime))
        if(this.transform.position.x>this.game.boundary.x){
            console.log("self destroyed")
            this.game.destroy(this.id)
        }
    }

    public set speed(value:number){
        this._speed = value
    }

    public get speed():number{
        return this._speed
    }
    
}

function onTriggerEnter(self:BoxCollider,other:BoxCollider){
    if(other.gameObject instanceof Bullet){
        const bullet= other.gameObject as Bullet
        const scores = self.gameObject.game.findGameObjectByType(GameScores);
        if (!scores) {
          throw new Error(GAME_SCORES_NOT_FOUND);
        }
        if (!bullet.enemyBullet) {
          //play the death audio
          const audioPlayer = new AudioPlayer();
          audioPlayer.addClip(
            "enemy-death",
            "../../../audio/space-invaders/invaderkilled.wav"
          );
          const deathAudio = new GameObject(self.gameObject.game);
          deathAudio.addComponent(audioPlayer);
          self.gameObject.game.addGameObject(deathAudio);
          audioPlayer.playClip("enemy-death");
          //destroy the enemy
          scores.scores += (self.gameObject as BonusSpaceship).scores;
          self.gameObject.game.destroy(self.gameObject.id);
          other.gameObject.game.destroy(other.gameObject.id);
        }
    }
}