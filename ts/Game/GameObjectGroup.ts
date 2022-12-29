import GameObject from "./GameObject.js";
import Game from "./gameEngine/Game.js";
import Transform from "./util/Trsansform.js";
import Vector from "./util/Vector.js";

type Constructor<T> = new (...args: any[]) => T;
export default class GameObjectGroup extends GameObject {
  private _childs: GameObject[] = [];

  constructor(game: Game, transform?: Transform) {
    super(game, transform);
  }

  public addChild(gameObject: GameObject): void {
    gameObject.transform.transfer(this.transform.position);
    const scale = this.transform.scale;
    const goScale = gameObject.transform.scale;
    gameObject.transform.resize(
      new Vector(scale.x * goScale.x, scale.y * goScale.y)
    );
    this._childs.push(gameObject);
  }

  public destroy(): void {
    this._childs.forEach((c) => c.destroy());
  }

  public componentUpdate(): void {
    this._childs.forEach((ch) => ch.componentUpdate());
  }

  public earlyUpdate(): void {
    this._childs.forEach((ch) => ch.earlyUpdate());
  }

  public update(): void {
    this._childs.forEach((ch) => ch.update());
  }

  public lateUpdate(): void {
    this._childs.forEach((ch) => ch.lateUpdate());
  }

  public start(): void {
    this._childs.forEach((ch) => ch.start());
  }

  public findChild<T>(gameObjectType: Constructor<T>): T | null {
    return this._childs.find((c) => c instanceof gameObjectType) as T;
  }

  public findChilds<T>(gameObjectsType: Constructor<T>): T[] {
    return this._childs.filter((c) => c instanceof gameObjectsType) as T[];
  }

  public getAllComponents<T>(componentType: Constructor<T>): T[] {
    return this._childs.reduce(
      (prev: T[], next: GameObject) => [
        ...prev,
        ...next.getAllComponents(componentType),
      ],
      []
    );
  }

  public find(predicate: {
    (gameObject: GameObject): boolean;
  }): GameObject | undefined {
    for (const go of this._childs) {
      if (go instanceof GameObjectGroup) {
        const groupResults = go.find(predicate);
        if (groupResults != undefined) {
          return groupResults;
        }
      }
      if (predicate(go)) {
        return go;
      }
    }
  }

  public filter(predicate: {
    (gameObject: GameObject): boolean;
  }): GameObject[] {
    let filtered: GameObject[] = [];
    for (const go of this._childs) {
      if (go instanceof GameObjectGroup) {
        filtered = [...filtered, ...go.filter(predicate)];
      }
      if (predicate(go)) {
        filtered.push(go);
      }
    }
    return filtered;
  }

  public applyFilter(predicate: { (gameObject: GameObject): boolean }): void {
    const newChilds: GameObject[] = [];
    for (const go of this._childs) {
      if (go instanceof GameObjectGroup) {
        go.applyFilter(predicate);
      }
      if (predicate(go)) {
        newChilds.push(go);
      }
    }
    this._childs = newChilds;
  }

  protected get childs(): GameObject[] {
    return this._childs;
  }
}
