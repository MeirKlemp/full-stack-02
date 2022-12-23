import Vector from "../../util/Vector";
export default class BoxCollider {
    constructor(parentTransform, pt1 = Vector.left, pt2 = Vector.right) {
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
    isCollided(other) {
        return false;
    }
}
