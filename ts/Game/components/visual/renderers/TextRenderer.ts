import TextBlock from "../Text.js";
import Renderer from "./Renderer.js";

export default class TextRenderer extends Renderer {
  constructor(text: TextBlock) {
    super(text);
  }

  /**
   * render the element to the screen
   * @param context the 2d context of the canvas
   */
  public render(context: CanvasRenderingContext2D): void {
    const text:TextBlock = this._displayItem as TextBlock
    context.font = `${text.fontSize}px ${text.fontName}`
    context.fillText(text.displayData(),text.position.x,text.position.y)
  }
}
