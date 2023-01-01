import Displayable from "./Displayable.js";
import { GAME_OBJECT_ERROR } from "../../../errors.js";
export default class Sprite extends Displayable {
    /**
     * create new sprite
     * @param name The name of the sprite
     * @param imgSrc The image path of the sprite
     */
    constructor(name, imgSrc) {
        super();
        this._name = name;
        this._imgSrc = imgSrc;
        this._image = document.createElement('img');
        this._image.src = imgSrc;
    }
    get position() {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        return this._gameObject.transform.position;
    }
    get image() {
        return this._image;
    }
    resize(scale) {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        this._gameObject.transform.resize(scale);
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
    displayData() {
        return this._imgSrc;
    }
    get scale() {
        if (this._gameObject == null) {
            throw new Error(GAME_OBJECT_ERROR);
        }
        return this._gameObject.transform.scale;
    }
}
