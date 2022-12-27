export default class Vector {
    constructor(x = 0, y = 0) {
        this._x = 0;
        this._y = 0;
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get magnitude() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }
    mult(scalar) {
        return new Vector(this._x * scalar, this._y * scalar);
    }
    add(other) {
        return new Vector(this._x + other._x, this._y + other._y);
    }
    sub(other) {
        return new Vector(this._x - other._x, this._y - other._y);
    }
    get norm() {
        return this.mult(this.magnitude);
    }
    get arr() {
        return [this.x, this.y];
    }
}
Vector.zero = new Vector(0, 0);
Vector.up = new Vector(0, 1);
Vector.down = new Vector(0, -1);
Vector.left = new Vector(-1, 0);
Vector.right = new Vector(1, 0);
