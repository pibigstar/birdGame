import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";


//下半部分铅笔
export class DownPencil extends Pencil{

    constructor(top){
        const image = Sprite.getImage("pencilDown");
        super(image,top)
    }

    draw(){
        let gap = window.innerWidth / 4; //铅笔之间的间隙
        this.y = this.top + gap;
        super.draw()
    }
}