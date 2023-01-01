import { GAME_OBJECT_ERROR } from "../../../errors.js";
import Color from "../../util/Color.js";
import Vector from "../../util/Vector.js";
import Displayable from "./Displayable.js";

export default class TextBlock extends Displayable{
    private _text:string = ""
    private _fontName: string;
    private _fontSize: number;
    private _color: Color;


    /**
     * Create new text box
     * @param text The text string
     * @param color The text color (Black by default)
     * @param fontSize The color font size
     * @param fontName The color font style name
     */
    constructor(text:string = "",color:Color = Color.rgb(0,0,0),fontSize:number = 30,fontName:string = "Ariel"){
        super()
        this._text = text
        this._fontSize = fontSize
        this._fontName = fontName
        this._color = color
    }

    /**
     * The text font size in PX
     */
    public get fontSize(): number {
        return this._fontSize;
    }

    public set fontSize(value: number) {
        this._fontSize = value;
    }

    /**
     * The text font name
     */
    public get fontName(): string {
        return this._fontName;
    }
    
    public set fontName(value: string) {
        this._fontName = value;
    }

    /**
     * The text color
     */
    public get color():Color{
        return this._color;
    }

    public set color(col:Color){
        this._color = col;
    }

    /**
     * Resize the text
     * @param scale the new size of the text. using only the vector x axis
     */
    public resize(scale: Vector): void {
        if(this._gameObject==null){
            throw new Error(GAME_OBJECT_ERROR)
        }
        this._gameObject.transform.resize(scale)
        this._fontSize = scale.x
    }

    
    /**
     * The text string
     */
    public set text(_text:string){
        this._text = _text
    }

    public get text():string{
        return this._text
    }

    /**
     * The data to display
     * @returns The text string
     */
    public displayData(): string {
        return this._text;
    }

}