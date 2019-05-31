//导演类，控制游戏逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    // 单例
    static getInstance(){
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor(){
        this.dataStroe = DataStore.getInstance();
        //移动速度
        this.moveSpeed = 2;
        //游戏是否结束了
        this.isGameOver = false;
    }
    run() {
        //检查小鸟是否撞击了
        this.checkBird();
        this.dataStroe.get("background").draw();
        const pencils = this.dataStroe.get("pencils");
        // 当铅笔刚好出屏幕最左方,并且铅笔数为4
        if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
            pencils.shift();
            pencils.shift();
            //重新初始化加分
            this.dataStroe.get("score").isScore = true;
        }
        //当一个屏内只有一根的时候，创建另一组铅笔
        if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
            this.createPencil();
        }
        this.dataStroe.get("pencils").forEach(function (value) {
            value.draw();
        })
        //后绘制陆地是为了覆盖掉铅笔
        this.dataStroe.get("land").draw();
        this.dataStroe.get("score").draw();
        //小鸟处于图层最上层
        this.dataStroe.get("birds").draw();

        //循环运行run函数，不停重绘
        let timer = requestAnimationFrame(() => this.run());
        this.dataStroe.put("timer", timer);
        //如果游戏结束
        if (this.isGameOver) {
            this.dataStroe.get("startButton").draw();
            cancelAnimationFrame(this.dataStroe.get("timer"))
            this.dataStroe.destroy();
        }
    }

    //创建一组铅笔
    createPencil(){
        const minTop = window.innerWidth / 8;
        const maxTop = window.innerWidth / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStroe.get("pencils").push(new UpPencil(top))
        this.dataStroe.get("pencils").push(new DownPencil(top))
    }

    birdsEvent(){
        for(let i=0;i<=2;i++){
            this.dataStroe.get("birds").y[i] = this.dataStroe.get("birds").birdsY[i];
        }
        this.dataStroe.get("birds").time = 0;
    }

    //判断小鸟是否撞击地板或铅笔
    checkBird() {
        const birds = this.dataStroe.get("birds");
        const land = this.dataStroe.get("land");
        const pencils = this.dataStroe.get("pencils");
        const score = this.dataStroe.get("score");
        //地板撞击
        if(birds.birdsY[0] + birds.birdsHeight[0]*2 >= land.y){
            this.isGameOver = true;
            return;
        }
        //铅笔撞击
        //小鸟边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        }
        const length = pencils.length;
        for(let i=0; i < length; i++){
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            }
            if(Director.isStrike(birdsBorder, pencilBorder)){
                console.log("撞到了。。。。。。。。。。")
                this.isGameOver = true;
                return;
            }
        }
        //加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
            score.score++;
            score.isScore = false;
        }
    }
    //判断小鸟与铅笔是否撞击
    static isStrike(bird,pencil){
        //默认是撞击到的
        let strike = true;
        //下面是没有撞到铅笔的情况
        if( bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right) {
            strike = false;
        }
        return strike;
    }
}