export default class Vector {
  private _x: number = 0;
  private _y: number = 0;

  public static zero = new Vector(0, 0);
  public static up = new Vector(0, 1);
  public static down = new Vector(0, -1);
  public static left = new Vector(-1, 0);
  public static right = new Vector(1, 0);

  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get magnitude(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }
  public mult(scalar: number): Vector {
    return new Vector(this._x * scalar, this._y * scalar);
  }
  public add(other: Vector): Vector {
    return new Vector(this._x + other._x, this._y + other._y);
  }
  public sub(other: Vector): Vector {
    return new Vector(this._x - other._x, this._y - other._y);
  }
  public get norm(): Vector {
    return this.mult(this.magnitude);
  }
  public get arr():number[]{
    return [this.x,this.y]
  }
}

