import Vector from "../../util/Vector.js";
import Component from "../Component.js";
export default class BoxCollider extends Component {
    constructor(parentTransform, pt1 = Vector.left, pt2 = Vector.right) {
        super();
        this._onCollideEvents = [];
        this._onTriggerEnterEvents = [];
        this._isTrigger = false;
        this._parentTransform = parentTransform;
        this._maxPt = new Vector(Math.max(pt1.x, pt2.x), Math.max(pt1.y, pt2.y));
        this._minPt = new Vector(Math.min(pt1.x, pt2.x), Math.min(pt1.y, pt2.y));
    }
    get minPos() {
        return this._minPt.add(this._parentTransform.position);
    }
    get maxPos() {
        return this._maxPt.add(this._parentTransform.position);
    }
    registerCollisionEvent(collisionEvent) {
        this._onCollideEvents.push(collisionEvent);
    }
    checkCollision(other) {
        if (this.isCollided(other)) {
            this.onCollide(other);
            if (other._isTrigger) {
                this.onTriggerEnter(other);
            }
        }
    }
    set isTrigger(value) {
        this._isTrigger = value;
    }
    get isTrigger() {
        return this.isTrigger;
    }
    isCollided(other) {
        return !(this.minPos.x > other.maxPos.x || this.minPos.y > other.maxPos.y || this.maxPos.x < other.minPos.x || this.minPos.y < other.maxPos.y);
    }
    onTriggerEnter(other) {
        this._onTriggerEnterEvents.forEach(trigger => trigger(this, other));
    }
    onCollide(other) {
        this._onCollideEvents.forEach(oce => oce(this, other));
    }
}
