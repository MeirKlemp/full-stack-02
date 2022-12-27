import $ from "../../tools/fastAccess.js";
import Displayable from "../components/visual/Displayable.js";
import Renderer from "../components/visual/renderers/Renderer.js";
import Vector from "../util/Vector.js";

export default class Drawer {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._canvas.width = $.w.innerWidth;
    this._canvas.height = $.w.innerHeight;
    this._context = this._canvas.getContext("2d");
  }

  public drawScreen(elements: Renderer[]) {}
  /**
   * Draw image to canvas
   * @param src The path to the image to draw
   * @returns The rendered image tag
   */
  public static drawImage(
    src: string,
    position: Vector,
    scale: Vector,
    context: CanvasRenderingContext2D
  ): HTMLImageElement {
    const image: HTMLImageElement = document.createElement("img");
    image.src = src;
    image.onload = () =>
      context.drawImage(image, position.x, position.y, scale.x, scale.y);
    return image;
  }
  
  public static drawSolid(position:Vector,scale:Vector,context:CanvasRenderingContext2D):void{
    //TODO :: implement that method
  }
}
