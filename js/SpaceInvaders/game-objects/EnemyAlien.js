import { GAME_MANAGER_NOT_FOUND, GAME_OBJECT_NOT_FOUND, GAME_SCORES_NOT_FOUND, PLAYER_LIVES_NOT_FOUND, } from "../../errors.js";
import GameObject from "../../Game/GameObject.js";
import ImageRenderer from "../../Game/components/visual/renderers/ImageRenderer.js";
import Game from "../../Game/gameEngine/Game.js";
import Vector from "../../Game/util/Vector.js";
import GameManager from "./GameManager.js";
import Animation from "../../Game/components/visual/Animation.js";
import BoxCollider from "../../Game/components/colliders/BoxCollider.js";
import Bullet from "./Bullet.js";
import GameScores from "./GameScores.js";
import EnemyGroup from "./EnemyGroup.js";
import PlayerLives from "./player-lives/PlayerLives.js";
import AudioPlayer from "../../Game/components/audio/AudioPlayer.js";
export default class EnemyAlien extends GameObject {
    /**
     * create new Enemy unit
     * @param game the game that the unit will be attached to
     * @param transform the initial transform of the unit
     */
    constructor(game, animation, transform) {
        super(game, transform);
        this._scores = 0;
        this._initialSpeed = 10;
        this._accelleration = 5;
        this._shootProbability = 0.00001;
        this._baseEnemiesModifier = 57;
        this._gameOverHeight = 100;
        this._initialTimeBetweenFrames = 1;
        this._difficultyDiff = {
            easy: 0.5,
            medium: 1,
            hard: 2,
            impossible: 100,
        };
        const gm = game.findGameObjectByType(GameManager);
        if (gm == null) {
            throw new Error(GAME_MANAGER_NOT_FOUND);
        }
        this._gameManager = gm;
        this.addComponent(animation);
        const renderer = new ImageRenderer(animation);
        this.addComponent(renderer);
        //add box collider
        const collider = new BoxCollider(Vector.zero, this.transform.scale);
        collider.registerTriggerCollisionEvent(onTriggerEnter);
        this.addComponent(collider);
        animation.registerAnimationChangeEvent(onAnimationChanged);
    }
    /**
     * the unit speed
     */
    get speed() {
        const group = this.game.findGameObjectByType(EnemyGroup);
        if (!group) {
            throw new Error(GAME_OBJECT_NOT_FOUND(EnemyGroup));
        }
        return (this._initialSpeed +
            this._accelleration *
                (this._baseEnemiesModifier - group.reaminingAliens) *
                this._difficultyDiff[this._gameManager.difficulty]);
    }
    updateTimeBetweenAnimationFrames() {
        const group = this.game.findGameObjectByType(EnemyGroup);
        if (!group) {
            throw new Error(GAME_OBJECT_NOT_FOUND(EnemyGroup));
        }
        console.log(1 - (this.shootRandomness * 499), this.shootRandomness, this.shootRandomness * 499);
        this.getComponent(Animation).timeBetweenFrames =
            Math.max(1 - (this.shootRandomness * 499), 0.0000001) / 1.5;
    }
    /**
     * the unit speed
     */
    set speed(value) {
        this._initialSpeed = value;
    }
    /**
     * the amount of score the player getting for killing the unit
     */
    get scores() {
        return this._scores;
    }
    /**
     * the amount of scores the player getting for killing the unit
     */
    set scores(value) {
        this._scores = value;
    }
    /**
     * get the next movemenmt
     */
    get nextMovement() {
        const moveLeft = this._gameManager.isMovingLeft;
        const direction = moveLeft ? Vector.left : Vector.right;
        const expectedMovement = direction.mult(this.speed * Game.deltaTime);
        return expectedMovement;
    }
    earlyUpdate() {
        const nextPosition = this.nextMovement.add(this.transform.position);
        if (nextPosition.x < 0 ||
            nextPosition.add(this.transform.scale).x > this.game.boundary.x) {
            this._gameManager.switchSeide();
            this._gameManager.moveDown();
        }
    }
    update() {
        if (this._gameManager.isMovingDown) {
            this.transform.transfer(Vector.down.mult(this._gameManager.downStep));
        }
        this.transform.transfer(this.nextMovement);
        //randomly shoot a bullet to the player
        if (Math.random() < this.shootRandomness) {
            const bullet = new Bullet(this.game, this.transform.position.add(Vector.left.mult(this.transform.scale.x / 2)), true, 5);
            this.game.addGameObject(bullet);
        }
        //if the aliens too low -> kill the player
        if (this.transform.position.y >
            this.game.boundary.y - this._gameOverHeight) {
            const lives = this.game.findGameObjectByType(PlayerLives);
            if (!lives) {
                throw new Error(PLAYER_LIVES_NOT_FOUND);
            }
            lives.decreaseLive();
        }
        this.updateTimeBetweenAnimationFrames();
    }
    get shootRandomness() {
        const group = this.game.findGameObjectByType(EnemyGroup);
        if (!group) {
            throw new Error(GAME_OBJECT_NOT_FOUND(EnemyGroup));
        }
        return ((this._baseEnemiesModifier - group.reaminingAliens) *
            this._shootProbability *
            this._difficultyDiff[this._gameManager.difficulty]);
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
function onAnimationChanged(self) {
    const enemies = self.gameObject.game
        .findGameObjectByType(EnemyGroup)
        .triggerAnimationChange();
}
