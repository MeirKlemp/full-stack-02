import GameObject from "../../Game/GameObject.js";
import Game from "../../Game/gameEngine/Game.js";
import GameScores from "./GameScores.js";
import { BAD_CREDENTIALS, GAME_SCORES_NOT_FOUND } from "../../errors.js";
import $ from "../../tools/fastAccess.js";
import Player from "./Player.js";
import ScoresState from "../ScoresState.js";
import BonusSpaceship from "./BonusSpaceship.js";
export var GameDifficulty;
(function (GameDifficulty) {
    GameDifficulty["EASY"] = "easy";
    GameDifficulty["MEDIUM"] = "medium";
    GameDifficulty["HARD"] = "hard";
    GameDifficulty["IMPOSSIBLE"] = "impossible";
})(GameDifficulty || (GameDifficulty = {}));
export default class GameManager extends GameObject {
    constructor(game, difficulty = GameDifficulty.EASY) {
        super(game);
        this._enemyMoveLeft = false;
        this._enemyMovingDown = false;
        this._positionSwapped = false;
        this.downStep = 10;
        this._canPlayerShoot = true;
        this._respawnTimer = 0;
        this._playerDead = false;
        this.bonusProbability = 0.000001;
        this.difficulty = difficulty;
    }
    lateUpdate() {
        this._enemyMovingDown = false;
        this._positionSwapped = false;
        if (this._playerDead) {
            this._respawnTimer -= Game.deltaTime;
            if (this._respawnTimer <= 0) {
                this.respawnPlayer();
                this._playerDead = false;
            }
        }
        //add bonus spaceship sometimes
        if (Math.random() < this.bonusProbability) {
            this.game.addGameObject(new BonusSpaceship(this.game));
        }
    }
    /**
     * change the movement side of the enemy units
     */
    switchSeide() {
        if (!this._positionSwapped) {
            this._enemyMoveLeft = !this._enemyMoveLeft;
            this._positionSwapped = true;
        }
    }
    /**
     * respawn the player
     */
    respawnPlayer() {
        const player = new Player(this.game);
        this.game.addGameObject(player);
    }
    /**
     * set the enemies to move down one step
     */
    moveDown() {
        this._enemyMovingDown = true;
    }
    /**
     * is the unit mobing left
     */
    get isMovingLeft() {
        return this._enemyMoveLeft;
    }
    /**
     * are the enemy units needs to move down
     */
    get isMovingDown() {
        return this._enemyMovingDown;
    }
    /**
     * are the enemy units needs to move down
     */
    set isMovingDown(value) {
        this._enemyMovingDown = value;
    }
    /**
     * kill the player
     */
    killPlayer() {
        this._respawnTimer = 1.5;
        this._playerDead = true;
        const player = this.game.findGameObjectByType(Player);
        if (player) {
            this.game.destroy(player.id);
        }
    }
    /**
     * set the game to game over mode
     * @param isWin is teh player won
     */
    gameOver(isWin) {
        const score = this.game.findGameObjectByType(GameScores);
        if (!score) {
            throw new Error(GAME_SCORES_NOT_FOUND);
        }
        const userKey = $.cookie('user');
        if (!userKey) {
            throw new Error(BAD_CREDENTIALS);
        }
        const data = this.game.loadState(userKey);
        const state = ScoresState.load(data);
        const diffScore = state[this.difficulty];
        diffScore.lastScores = score.scores;
        diffScore.bestScores = Math.max(diffScore.bestScores, score.scores);
        this.game.saveState(userKey, state);
        this.game.restart();
    }
    /**
     * can the player shoot now
     */
    get canPlayerShoot() {
        return this._canPlayerShoot;
    }
    /**
     * can the player shoot now
     */
    set canPlayerShoot(value) {
        this._canPlayerShoot = value;
    }
}
