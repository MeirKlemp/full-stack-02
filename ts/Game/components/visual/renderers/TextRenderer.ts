import Vector from "../../../util/Vector.js";
import TextBlock from "../Text.js";
import Renderer from "./Renderer.js";

export default class TextRenderer extends Renderer {
  private _padding:Vector

  /**
   * Create new text renderer
   * @param text The text of the renderer
   * @param padding The padding of the text relative to the game object
   */
  constructor(text: TextBlock,padding:Vector=Vector.zero) {
    super(text);
    this._padding = padding
  }

  /**
   * render the element to the screen
   * @param context the 2d context of the canvas
   */
  public render(context: CanvasRenderingContext2D): void {
    const text:TextBlock = this._displayItem as TextBlock
    context.font = `${text.fontSize}px ${text.fontName}`
    context.fillStyle = text.color.color
    const pos:Vector = text.position.add(this._padding)
    context.fillText(text.displayData(),pos.x,pos.y)
  }
}
