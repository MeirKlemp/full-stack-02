import Transform from "../../util/Trsansform";
import Vector from "../../util/Vector";

export default class BoxCollider{
    private _parentTransform:Transform
    private _maxPt:Vector
    private _minPt:Vector

    constructor(parentTransform:Transform,pt1:Vector = Vector.left,pt2:Vector = Vector.right){
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

    isCollided(other:BoxCollider):boolean{
        return false;
    }
}