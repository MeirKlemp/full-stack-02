import { NO_HEX_ERROR } from "../../errors.js"

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export default class Color{
    private _colorData:RGB|RGBA|HEX
    


    private constructor(color:RGB|RGBA|HEX){
        this._colorData = color
    }
    
    /**
     * create color with rgba
     * @param r The red scale of the color
     * @param g The green scale of the color
     * @param b The blue scale of the color
     * @returns color with the given presentation
     */
    public static rgb(r:number,g:number,b:number):Color{
        return new Color(`rgb(${r}, ${g}, ${b})`)
    }

    /**
     * create color with rgba
     * @param r The red scale of the color
     * @param g The green scale of the color
     * @param b The blue scale of the color
     * @param a The alpha scale of the color
     * @returns color with the given presentation
     */
    public static rgba(r:number,g:number,b:number,a:number):Color{
        return new Color(`rgba(${r}, ${g}, ${b}, ${a})`)
    }

    /**
     * create color by hex
     * @param h The hex presentation of the color
     * @returns color with the given presentation
     */
    public static hex(h:string):Color{
        if(h.match(/[^1-9a-fA-F]+/)!=null){
            throw new Error(NO_HEX_ERROR)
        }
        return new Color(`#${h}`)
    }
    public get color():string{
        return this._colorData;
    }

    /**
     * a white color
     */
    public static get WHITE():Color{
        return Color.rgb(255,255,255)
    }

    /**
     * a black color
     */
    public static get BLACK():Color{
        return Color.rgb(0,0,0)
    }
}