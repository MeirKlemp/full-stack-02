import { GAME_OBJECT_ERROR } from "../../../errors.js";
import Vector from "../../util/Vector.js";
import Component from "../Component.js";
export default class BoxCollider extends Component {
    /**
     * Create new Box collider
     * @param position The position of the collider relative to the game object
     * @param scale the scale of the collider
     */
    constructor(position, scale) {
        super();
        this._onCollideEvents = [];
        this._onTriggerEnterEvents = [];
        this._isTrigger = false;
        this._maxPt = new Vector(Math.max(position.x, scale.x), Math.max(position.y, scale.y));
        this._minPt = new Vector(Math.min(position.x, scale.x), Math.min(position.y, scale.y));
    }
    get minPos() {
        return this._minPt.add(this._parentTransform.position);
    }
    get maxPos() {
        return this._maxPt.add(this._parentTransform.position);
    }
    get _parentTransform() {
        if (!this._gameObject) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        return this._gameObject.transform;
    }
    /**
     * Add event to the collider
     * @param collisionEvent event to shot on collision
     */
    registerCollisionEvent(collisionEvent) {
        this._onCollideEvents.push(collisionEvent);
    }
    registerTriggerCollisionEvent(collisionEvent) {
        this._onTriggerEnterEvents.push(collisionEvent);
    }
    /**
     * check if there is collision with another collider and execte the collisions events if yes
     * @param other  another collider
     */
    checkCollision(other) {
        if (this.isCollided(other)) {
            this.onCollide(other);
            if (other._isTrigger) {
                this.onTriggerEnter(other);
            }
        }
    }
    /**
     * is the collider is trigger collider
     */
    set isTrigger(value) {
        this._isTrigger = value;
    }
    /**
     * is the collider is trigger collider
     */
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
