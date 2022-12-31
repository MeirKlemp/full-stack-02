import ImageRenderer from "../../../Game/components/visual/renderers/ImageRenderer.js";
import Sprite from "../../../Game/components/visual/Sprite.js";
import GameObject from "../../../Game/GameObject.js";
export default class PlayerLive extends GameObject {
    constructor(game, transform, index) {
        super(game, transform);
        this._index = index;
        //add the sprite of the spaceship
        const sprite = new Sprite("player-hp", "../../../../images/space-invaders/player.png");
        this.addComponent(sprite);
        this.addComponent(new ImageRenderer(sprite));
    }
    get index() {
        return this._index;
    }
}
