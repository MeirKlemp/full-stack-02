import GameObjectGroup from "../../Game/GameObjectGroup.js";
import Transform from "../../Game/util/Trsansform.js";
import Vector from "../../Game/util/Vector.js";
import Animation from "../../Game/components/visual/Animation.js";
import EnemyAlien from "./EnemyAlien.js";
import GameManager from "./GameManager.js";
import { GAME_MANAGER_NOT_FOUND } from "../../errors.js";
import AudioPlayer from "../../Game/components/audio/AudioPlayer.js";
//set up the sprites for the enemies
const sprites = [
    [
        "../../images/space-invaders/alien30.png",
        "../../images/space-invaders/alien31.png",
    ],
    [
        "../../images/space-invaders/alien20.png",
        "../../images/space-invaders/alien21.png",
    ],
    [
        "../../images/space-invaders/alien20.png",
        "../../images/space-invaders/alien21.png",
    ],
    [
        "../../images/space-invaders/alien10.png",
        "../../images/space-invaders/alien11.png",
    ],
    [
        "../../images/space-invaders/alien10.png",
        "../../images/space-invaders/alien11.png",
    ],
];
export default class EnemyGroup extends GameObjectGroup {
    constructor(game) {
        super(game);
        this._nextClip = 0;
        this._animationChanged = false;
        this.transform.transfer(new Vector(20, 150));
        this.setEnemies();
        //add audio player
        const player = new AudioPlayer();
        const audioPath = "../../../audio/space-invaders/";
        player.addClip("mv1", `${audioPath}mv1.wav`);
        player.addClip("mv2", `${audioPath}mv2.wav`);
        player.addClip("mv3", `${audioPath}mv3.wav`);
        player.addClip("mv4", `${audioPath}mv4.wav`);
        this.addComponent(player);
    }
    setEnemies() {
        const scores = [30, 20, 20, 10, 10];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 11; j++) {
                this.spawnEnemy(new Vector(j * 50, i * 50), scores[i], ...sprites[i]);
            }
        }
    }
    spawnEnemy(position, scores, ...imagesPath) {
        const enemyTransform = new Transform(new Vector(50, 50), position);
        const enemyAnimation = new Animation("demoEnemy", 1, ...imagesPath);
        const enemy = new EnemyAlien(this._game, enemyAnimation, enemyTransform);
        //enemy.speed = 10;
        enemy.scores = scores;
        this.addChild(enemy);
    }
    /**
     * The next clip to play
     */
    get nextClip() {
        this._nextClip = (this._nextClip + 1) % 4;
        return this._nextClip + 1;
    }
    /**
     * make the animation change function rin at the next update cicle
     */
    triggerAnimationChange() {
        this._animationChanged = true;
    }
    get reaminingAliens() {
        return this.findChilds(EnemyAlien).length;
    }
    update() {
        super.update();
        if (this.childs.length == 0) {
            const manager = this.game.findGameObjectByType(GameManager);
            if (!manager) {
                throw new Error(GAME_MANAGER_NOT_FOUND);
            }
            manager.gameOver(true);
        }
        if (this._animationChanged) {
            // console.log("anumation changed")
            this._animationChanged = false;
            this.getComponent(AudioPlayer).playClip(`mv${this.nextClip}`);
        }
    }
}
