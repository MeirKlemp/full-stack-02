import { NULL_CONTEXT_ERROR } from "../../errors.js";
import $ from "../../tools/fastAccess.js";
import Color from "../util/Color.js";
import Vector from "../util/Vector.js";
export default class Drawer {
    constructor(canvas, boundary) {
        this._canvas = canvas;
        if (boundary != null) {
            this._boundary = boundary;
        }
        else {
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
    drawScreen(elements) {
        this._context.clearRect(0, 0, $.w.innerWidth, $.w.innerHeight);
        elements.forEach((elemnt) => elemnt.render(this._context));
    }
    /**
     * get the canvas Background color
     */
    get backgroundColor() {
        return this._bgColor;
    }
    /**
     * set the game background color
     */
    set backgroundColor(newColor) {
        this._bgColor = newColor;
        this._canvas.style.background = newColor.color;
    }
    /**
     * The buttom right point of the game
     */
    get boundary() {
        return this._boundary;
    }
    /**
     * Draw image to canvas
     * @param src The path to the image to draw
     * @returns The rendered image tag
     */
    static drawImage(image, position, scale, context) {
        context.drawImage(image, position.x, position.y, scale.x, scale.y);
        return image;
    }
    static drawSolid(position, scale, context) {
        //TODO :: implement that method
    }
}
