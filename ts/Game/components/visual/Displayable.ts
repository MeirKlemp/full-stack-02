import Vector from "../../util/Vector";

export default interface Displayable {
  /**
   *
   * @returns The image to diplay now
   */
  displayData(): HTMLImageElement;
  /**
   * get the scale of the data to display in px
   */
  get scale(): Vector;

  /**
   * the position of the object to display
   */
  get position():Vector;
}
