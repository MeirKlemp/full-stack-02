import GameObjectGroup from "../../../Game/GameObjectGroup.js";
import Color from "../../../Game/util/Color.js";
import Vector from "../../../Game/util/Vector.js";
import ShildBlock from "./ShildBlock.js";
export default class Shild extends GameObjectGroup {
    constructor(game, position) {
        super(game);
        this.transform.transfer(position);
        this.setupShild();
    }
    setupShildsColumn(yPos) {
        this.addChild(new ShildBlock(this.game, Vector.down.mult(yPos), Shild.shildColor));
        this.addChild(new ShildBlock(this.game, Vector.down.mult(yPos).add(Vector.right.mult(ShildBlock.width)), Shild.shildColor));
        this.addChild(new ShildBlock(this.game, Vector.down.mult(yPos).add(Vector.right.mult(ShildBlock.width * 2)), Shild.shildColor));
        this.addChild(new ShildBlock(this.game, Vector.down.mult(yPos).add(Vector.right.mult(ShildBlock.width * 3)), Shild.shildColor));
    }
    setupShildButtom(yPos) {
        this.addChild(new ShildBlock(this.game, Vector.down.mult(yPos), Shild.shildColor));
        this.addChild(new ShildBlock(this.game, Vector.down.mult(yPos).add(Vector.right.mult(ShildBlock.width * 3)), Shild.shildColor));
    }
    setupShild() {
        this.setupShildsColumn(0);
        this.setupShildsColumn(ShildBlock.height);
        this.setupShildsColumn(ShildBlock.height * 2);
        this.setupShildButtom(ShildBlock.height * 3);
        this.setupShildButtom(ShildBlock.height * 4);
    }
}
Shild.shildColor = Color.rgb(51, 204, 0);
