import BoxCollider from "../../../Game/components/colliders/BoxCollider.js";
import SolidRenderer from "../../../Game/components/visual/renderers/SolidRenderer.js";
import Solid from "../../../Game/components/visual/Solid.js";
import GameObject from "../../../Game/GameObject.js";
import Vector from "../../../Game/util/Vector.js";
import Bullet from "../Bullet.js";
import EnemyAlien from "../EnemyAlien.js";
export default class ShildBlock extends GameObject {
    constructor(game, position, color) {
        super(game);
        this.transform.transfer(position);
        this.transform.resize(new Vector(ShildBlock.width, ShildBlock.height));
        const solid = new Solid(color);
        const solidRenderer = new SolidRenderer(solid);
        this.addComponent(solid);
        this.addComponent(solidRenderer);
        const collider = new BoxCollider(Vector.zero, this.transform.scale);
        collider.registerCollisionEvent(onCollisionEnter);
        this.addComponent(collider);
    }
}
ShildBlock.height = 10;
ShildBlock.width = 25;
function onCollisionEnter(self, other) {
    if (other.gameObject instanceof Bullet) {
        const bullet = other.gameObject;
        bullet.game.destroy(self.gameObject.id);
        bullet.game.destroy(bullet.id);
    }
    else if (other.gameObject instanceof EnemyAlien) {
        other.gameObject.game.destroy(self.gameObject.id);
    }
}
