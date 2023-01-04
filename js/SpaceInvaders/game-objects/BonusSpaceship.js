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
export default class BonusSpaceship extends GameObject {
    /**
     * generate new bonus space ship that moving from left to right
     * @param game the game
     */
    constructor(game) {
        super(game);
        this._speed = 100;
        this._initialPosition = new Vector(0, 120);
        this.scores = 100;
        //set the spaceship audio
        const audioPlayer = new AudioPlayer();
        audioPlayer.addClip("bonus", "../../audio/space-invaders/ufo_highpitch.wav");
        audioPlayer.loop = true;
        audioPlayer.playClip("bonus");
        this.addComponent(audioPlayer);
        //set the spaceship initial transform
        this.transform.transfer(this._initialPosition);
        this.transform.resize(new Vector(80, 40));
        //set the spaceship sprite
        const sprite = new Sprite("bonus", "../../images/space-invaders/bonusB.png");
        this.addComponent(sprite);
        const imageRenderer = new ImageRenderer(sprite);
        this.addComponent(imageRenderer);
        //add box collider
        const collider = new BoxCollider(this.transform.position, this.transform.scale);
        collider.registerTriggerCollisionEvent(onTriggerEnter);
        this.addComponent(collider);
    }
    update() {
        this.transform.transfer(Vector.right.mult(this._speed * Game.deltaTime));
        if (this.transform.position.x > this.game.boundary.x) {
            console.log("self destroyed");
            this.game.destroy(this.id);
        }
    }
    set speed(value) {
        this._speed = value;
    }
    get speed() {
        return this._speed;
    }
}
function onTriggerEnter(self, other) {
    if (other.gameObject instanceof Bullet) {
        const bullet = other.gameObject;
        const scores = self.gameObject.game.findGameObjectByType(GameScores);
        if (!scores) {
            throw new Error(GAME_SCORES_NOT_FOUND);
        }
        if (!bullet.enemyBullet) {
            //play the death audio
            const audioPlayer = new AudioPlayer();
            audioPlayer.addClip("enemy-death", "../../../audio/space-invaders/invaderkilled.wav");
            const deathAudio = new GameObject(self.gameObject.game);
            deathAudio.addComponent(audioPlayer);
            self.gameObject.game.addGameObject(deathAudio);
            audioPlayer.playClip("enemy-death");
            //destroy the enemy
            scores.scores += self.gameObject.scores;
            self.gameObject.game.destroy(self.gameObject.id);
            other.gameObject.game.destroy(other.gameObject.id);
        }
    }
}
