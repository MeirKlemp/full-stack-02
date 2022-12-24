import Component from "../components/Component";
import Vector from "../util/Vector";
export default class Sprite extends Component {
    /**
     * create new sprite
     * @param name The name of the sprite
     * @param imgSrc The image path of the sprite
     */
    constructor(name, imgSrc) {
        super();
        this._name = name;
        this._imgSrc = imgSrc;
        this._img = new Image();
        this._img.src = this._imgSrc;
    }
    /**
     * the sorce of the image of the sprite
     */
    get source() {
        return this._imgSrc;
    }
    /**
     * the name of the sprite
     */
    get name() {
        return this._name;
    }
    /**
     * the image of the sprite
     */
    get image() {
        return this._img;
    }
    displayData() {
        return this._img;
    }
    get scale() {
        return new Vector(this._img.width, this._img.height);
    }
    set scale(size) {
        this._img.width = size.x;
        this._img.height = size.y;
    }
}
