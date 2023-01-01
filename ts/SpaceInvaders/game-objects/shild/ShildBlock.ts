import BoxCollider from "../../../Game/components/colliders/BoxCollider.js";
import SolidRenderer from "../../../Game/components/visual/renderers/SolidRenderer.js";
import Solid from "../../../Game/components/visual/Solid.js";
import Game from "../../../Game/gameEngine/Game.js";
import GameObject from "../../../Game/GameObject.js";
import Color from "../../../Game/util/Color.js";
import Vector from "../../../Game/util/Vector.js";
import Bullet from "../Bullet.js";
import EnemyAlien from "../EnemyAlien.js";


export default class ShildBlock extends GameObject{

    public static readonly height = 10
    public static readonly width = 25


    constructor(game:Game,position:Vector,color:Color){
        super(game)
        this.transform.transfer(position)
        this.transform.resize(new Vector(ShildBlock.width,ShildBlock.height))
        const solid = new Solid(color)
        const solidRenderer = new SolidRenderer(solid);
        this.addComponent(solid)
        this.addComponent(solidRenderer)
        const collider = new BoxCollider(Vector.zero,this.transform.scale)
        collider.registerCollisionEvent(onCollisionEnter)
        this.addComponent(collider)
    }
}

function onCollisionEnter(self:BoxCollider,other:BoxCollider){
    if(other.gameObject instanceof Bullet){
        const bullet  = other.gameObject as Bullet
        bullet.game.destroy(self.gameObject.id)
        bullet.game.destroy(bullet.id)
    }
    else if(other.gameObject instanceof EnemyAlien){
        other.gameObject.game.destroy(self.gameObject.id)
    }
}