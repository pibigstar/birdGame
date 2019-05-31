import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";
// 铅笔基类
export class Pencil extends Sprite{

    // top为与顶部的距离，当为负值时则为上部分铅笔
    constructor(image, top) {
        super(image,0,0,image.width,image.height,window.innerWidth,0,image.width,image.height)
        this.top = top;
    }

    draw() {
        this.x = this.x - Director.getInstance().moveSpeed;
        super.draw(this.img,0,0,this.srcW,this.srcH,this.x,this.y,this.width,this.height)
    }
}