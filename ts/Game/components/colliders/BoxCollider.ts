import { GAME_OBJECT_ERROR } from "../../../errors.js";
import Transform from "../../util/Trsansform.js";
import Vector from "../../util/Vector.js";
import Component from "../Component.js";

export type collisionEvent  = {(self:BoxCollider,other:BoxCollider):void}

export default class BoxCollider extends Component{
    
    private _maxPt:Vector
    private _minPt:Vector
    private _onCollideEvents:collisionEvent[] = [];
    private _onTriggerEnterEvents:collisionEvent[] = [];
    private _isTrigger:boolean = false

    /**
     * Create new Box collider
     * @param position The position of the collider relative to the game object
     * @param scale the scale of the collider
     */
    constructor(position:Vector,scale:Vector){
        super()
        this._maxPt = new Vector(Math.max(position.x,scale.x),Math.max(position.y,scale.y))
        this._minPt = new Vector(Math.min(position.x,scale.x),Math.min(position.y,scale.y))
    }

    private get minPos():Vector{
        return this._minPt.add(this._parentTransform.position)
    }

    private get maxPos():Vector{
        return this._maxPt.add(this._parentTransform.position)
    }

    private get _parentTransform():Transform{
        if(!this._gameObject){
            throw new Error(GAME_OBJECT_ERROR)
        }
        return this._gameObject.transform
    }

    /**
     * Add event to the collider    
     * @param collisionEvent event to shot on collision
     */
    public registerCollisionEvent(collisionEvent:collisionEvent){
        this._onCollideEvents.push(collisionEvent)
    }

    public registerTriggerCollisionEvent(collisionEvent:collisionEvent){
        this._onTriggerEnterEvents.push(collisionEvent)
    }

    /**
     * check if there is collision with another collider and execte the collisions events if yes
     * @param other  another collider
     */
    public checkCollision(other:BoxCollider){

        if(this.isCollided(other)){
            this.onCollide(other)
            if(other._isTrigger){
                this.onTriggerEnter(other)
            }
        }
    }

    /**
     * is the collider is trigger collider
     */
    public set isTrigger(value:boolean){
        this._isTrigger = value
    }

    /**
     * is the collider is trigger collider
     */
    public get isTrigger():boolean{
        return this.isTrigger
    }

    private isCollided(other:BoxCollider):boolean{
        return !(this.minPos.x>other.maxPos.x||this.minPos.y>other.maxPos.y||this.maxPos.x<other.minPos.x||this.minPos.y<other.maxPos.y);
    }

    private onTriggerEnter(other:BoxCollider):void{
        this._onTriggerEnterEvents.forEach(trigger=>trigger(this,other))
    }

    private onCollide(other:BoxCollider):void{
        this._onCollideEvents.forEach(oce=>oce(this,other))
    }
}