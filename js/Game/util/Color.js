import { NO_HEX_ERROR } from "../../errors.js";
export default class Color {
    constructor(color) {
        this._colorData = color;
    }
    /**
     * create color with rgba
     * @param r The red scale of the color
     * @param g The green scale of the color
     * @param b The blue scale of the color
     * @returns color with the given presentation
     */
    static rgb(r, g, b) {
        return new Color(`rgb(${r}, ${g}, ${g})`);
    }
    /**
     * create color with rgba
     * @param r The red scale of the color
     * @param g The green scale of the color
     * @param b The blue scale of the color
     * @param a The alpha scale of the color
     * @returns color with the given presentation
     */
    static rgba(r, g, b, a) {
        return new Color(`rgba(${r}, ${g}, ${b}, ${a})`);
    }
    /**
     * create color by hex
     * @param h The hex presentation of the color
     * @returns color with the given presentation
     */
    static hex(h) {
        if (h.match(/[^1-9a-fA-F]+/) != null) {
            throw new Error(NO_HEX_ERROR);
        }
        return new Color(`#${h}`);
    }
    get color() {
        return this._colorData;
    }
    /**
     * a white color
     */
    static get WHITE() {
        return Color.rgb(255, 255, 255);
    }
    /**
     * a black color
     */
    static get BLACK() {
        return Color.rgb(0, 0, 0);
    }
}
