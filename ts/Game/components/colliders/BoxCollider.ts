import Transform from "../../util/Trsansform.js";
import Vector from "../../util/Vector.js";
import Component from "../Component.js";

export type collisionEvent  = {(self:BoxCollider,other:BoxCollider):void}

export default class BoxCollider extends Component{
    private _parentTransform:Transform
    private _maxPt:Vector
    private _minPt:Vector
    private _onCollideEvents:collisionEvent[] = [];
    private _onTriggerEnterEvents:collisionEvent[] = [];
    private _isTrigger:boolean = false

    constructor(parentTransform:Transform,pt1:Vector = Vector.left,pt2:Vector = Vector.right){
        super()
        this._parentTransform = parentTransform
        this._maxPt = new Vector(Math.max(pt1.x,pt2.x),Math.max(pt1.y,pt2.y))
        this._minPt = new Vector(Math.min(pt1.x,pt2.x),Math.min(pt1.y,pt2.y))
    }

    get minPos():Vector{
        return this._minPt.add(this._parentTransform.position)
    }

    get maxPos():Vector{
        return this._maxPt.add(this._parentTransform.position)
    }

    public registerCollisionEvent(collisionEvent:collisionEvent){
        this._onCollideEvents.push(collisionEvent)
    }

    public checkCollision(other:BoxCollider){
        if(this.isCollided(other)){
            this.onCollide(other)
            if(other._isTrigger){
                this.onTriggerEnter(other)
            }
        }
    }

    public set isTrigger(value:boolean){
        this._isTrigger = value
    }

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