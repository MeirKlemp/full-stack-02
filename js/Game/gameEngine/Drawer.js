import $ from "../../tools/fastAccess.js";
export default class Drawer {
    constructor(canvas) {
        this._canvas = canvas;
        this._canvas.width = $.w.innerWidth;
        this._canvas.height = $.w.innerHeight;
        this._context = this._canvas.getContext("2d");
    }
    drawScreen(elements) { }
    /**
     * Draw image to canvas
     * @param src The path to the image to draw
     * @returns The rendered image tag
     */
    static drawImage(src, position, scale, context) {
        const image = document.createElement("img");
        image.src = src;
        image.onload = () => context.drawImage(image, position.x, position.y, scale.x, scale.y);
        return image;
    }
    static drawSolid(position, scale, context) {
        //TODO :: implement that method
    }
}
