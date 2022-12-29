import GameObject from "../components/GameObject.js";
import Renderer from "../components/visual/renderers/Renderer.js";
import Vector from "../util/Vector.js";
import Drawer from "./Drawer.js";

export type gameInit = { (game: Game): void };
type Constructor<T> = new (...args: any[]) => T;
export default class Game {
  private _gameObjects: GameObject[];
  private _drawer: Drawer;
  private _boundary: Vector;
  private static readonly fps = 60;
  public static readonly deltaTime = 1 / Game.fps;

  constructor(drawer: Drawer, initFunction?: gameInit) {
    this._gameObjects = [];
    this._drawer = drawer;
    this._boundary = this._drawer.boundary;
    if (initFunction != null) {
      this.init(initFunction);
    }
  }

  public addGameObject(gameObject: GameObject) {
    this._gameObjects.push(gameObject);
  }

  public start(): void {
    this._gameObjects.forEach((go) => {
      go.start();
    });
  }

  public get drawer(): Drawer {
    return this._drawer;
  }

  public update(): void {
    this._gameObjects.forEach((go) => go.update());
  }

  public onInput(input: string): void {
    this._gameObjects.forEach((go) => go.onInput(input));
  }

  public drawScreen(): void {
    const renderers: Renderer[] = this._gameObjects.reduce<Renderer[]>(
      (prev: Renderer[], go: GameObject) => [
        ...prev,
        ...go.getComponents(Renderer),
      ],
      []
    );
    this.drawer.drawScreen(renderers);
  }

  public lateUpdate(): void {
    this._gameObjects.forEach((go) => go.lateUpdate());
  }

  public earlyUpdate(): void {
    this._gameObjects.forEach((go) => go.earlyUpdate());
  }

  public destroy(id: string) {
    this._gameObjects.find((go) => go.id == id)?.destroy();
    this._gameObjects = this._gameObjects.filter((go) => go.id == id);
  }

  public findGameObjectById(id: string): GameObject | undefined {
    return this._gameObjects.find((go) => go.id == id);
  }

  public findGameObject(predicate: {
    (component: GameObject): void;
  }): GameObject | undefined {
    return this._gameObjects.find(predicate);
  }

  private init(initFunction: gameInit): void {
    initFunction(this);
  }

  /**
   * get one game object with the given type
   * @param gameObjectType the type of the game object to find
   * @returns game object with the ginving type or null if not founded
   */
  public findGameObjectByType<T>(gameObjectType: Constructor<T>): T | null {
    return this._gameObjects.find((go) => go instanceof gameObjectType) as T;
  }

  /**
   * Get all the game objects with the given type
   * @param gameObjectsType the type of the game objects to find
   * @returns all the game objects with the given type
   */
  public findGameObjectsByType<T>(gameObjectsType: Constructor<T>): T[] {
    return this._gameObjects.filter(
      (go) => go instanceof gameObjectsType
    ) as T[];
  }

  /**
   * the boundary of the game
   */
  public get boundary(): Vector {
    return this._boundary;
  }

  /**
   * run the component update for all the game objects
   */
  public componentUpdate(): void {
    this._gameObjects.forEach((go) => go.componentUpdate());
  }

  /**
   * saves data to the locale storage
   * @param key the key of the data
   * @param value wha twe want to save in the locale storage
   */
  public saveState(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * lods game data from the locale storage
   * @param key the key of the data in the locale storage
   * @returns the stored object
   */
  public loadState(key: string): any {
    const res = localStorage.getItem(key);
    if (!res) {
      return res;
    }
    return JSON.parse(res);
  }
}
