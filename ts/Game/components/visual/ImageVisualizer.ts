import Displayable from "./Displayable";

export default interface ImageVisulizer extends Displayable{
    /**
     * the image to display
     */
    get image():HTMLImageElement
}