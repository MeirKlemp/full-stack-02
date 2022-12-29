import { NULL_CONTEXT_ERROR } from "../../errors.js";
import $ from "../../tools/fastAccess.js";
import Renderer from "../components/visual/renderers/Renderer.js";
import Color from "../util/Color.js";
import Vector from "../util/Vector.js";

export default class Drawer {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _bgColor: Color;
  private _boundary: Vector;

  constructor(canvas: HTMLCanvasElement, boundary?: Vector) {
    this._canvas = canvas;
    if (boundary != null) {
      this._boundary = boundary;
    } else {
      this._boundary = new Vector($.w.innerWidth, $.w.innerHeight);
    }
    this._canvas.width = this._boundary.x;
    this._canvas.height = this._boundary.y;
    this._bgColor = Color.rgb(0, 0, 0);
    this._canvas.style.background = this._bgColor.color;
    const context = this._canvas.getContext("2d");
    if (context == null) {
      throw new Error(NULL_CONTEXT_ERROR);
    }
    this._context = context;
  }

  /**
   * Render an array of renderers to the screen
   * @param elements All the elements to draw on the screen
   */
  public drawScreen(elements: Renderer[]) {
    this._context.clearRect(0, 0, $.w.innerWidth, $.w.innerHeight);
    elements.forEach((elemnt: Renderer) => elemnt.render(this._context));
  }

  /**
   * get the canvas Background color
   */
  public get backgroundColor(): Color {
    return this._bgColor;
  }

  /**
   * set the game background color
   */
  public set backgroundColor(newColor: Color) {
    this._bgColor = newColor;
    this._canvas.style.background = newColor.color;
  }

  /**
   * The buttom right point of the game
   */
  public get boundary(): Vector {
    return this._boundary;
  }
  /**
   * Draw image to canvas
   * @param src The path to the image to draw
   * @returns The rendered image tag
   */
  public static drawImage(
    image: HTMLImageElement,
    position: Vector,
    scale: Vector,
    context: CanvasRenderingContext2D
  ): HTMLImageElement {
    context.drawImage(image, position.x, position.y, scale.x, scale.y);
    return image;
  }

  public static drawSolid(
    position: Vector,
    scale: Vector,
    context: CanvasRenderingContext2D
  ): void {
    //TODO :: implement that method
  }
}
