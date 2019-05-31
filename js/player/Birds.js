import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

//小鸟类
export class Birds extends Sprite{
    constructor(){
        const image = Sprite.getImage("birds");
        super(image,0,0,image.width,image.height,0,0,image.width,image.height);

        //小鸟的三种状态需要一个数组去存储
        //小鸟的宽是34，小鸟的高度是24，上下边距是10，小鸟左右边距是9
        //每一组需要剪裁的X坐标
        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        //每一组需要剪裁的Y坐标
        this.clippingY = [10, 10, 10];
        //每一组需要剪裁的宽度
        this.clippingWidth = [34, 34, 34];
        //每一组需要剪裁的高度
        this.clippingHeight = [24, 24, 24];

        //小鸟的X，Y坐标
        this.birdX = window.innerWidth / 4;
        this.birdsX = [this.birdX,this.birdX,this.birdX]
        this.birdY = window.innerWidth / 2;
        this.birdsY = [this.birdY,this.birdY,this.birdY]
        // 小鸟的宽高
        this.birdWidth = 34;
        this.birdsWidth = [this.birdWidth, this.birdWidth, this.birdWidth]
        this.birdHeight = 24;
        this.birdsHeight = [this.birdHeight,this.birdHeight,this.birdHeight]

        this.y = [this.birdY,this.birdY,this.birdY];
        //第几只小鸟
        this.index = 0;
        this.count = 0;
        //下落时间
        this.time = 0;
    }

    draw(){
        //切换三只小鸟的速度
        const speed = 0.1;
        this.count = this.count + speed;
        if (this.index >= 2) {
            this.count = 0;
        }
        //减速器的作用
        this.index = Math.floor(this.count)

        //重力加速度 / 2.4
        const g = 0.98 / 2.4;
        //向上移动一丢丢偏移量
        const offsetup = 30;
        //Y位移偏移量
        const offsetY = (g * this.time * (this.time- offsetup)) / 2;
        for (let i=0;i<=2;i++){
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++

        super.draw(this.img,this.clippingX[this.index],this.clippingY[this.index],this.clippingWidth[this.index],this.clippingHeight[this.index],
            this.birdsX[this.index],this.birdsY[this.index],this.birdsWidth[this.index],this.birdsHeight[this.index])
    }
}