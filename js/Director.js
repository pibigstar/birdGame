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
        this.dataStroe.get("background").draw();
        const pencils = this.dataStroe.get("pencils");
        // 当铅笔刚好出屏幕最左方,并且铅笔数为4
        if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
            pencils.shift();
            pencils.shift();
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

        this.dataStroe.get("birds").draw();


        //循环运行run函数，不停重绘
        let timer = requestAnimationFrame(() => this.run());
        this.dataStroe.put("timer", timer);
        //如果游戏结束
        if (this.isGameOver) {
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
}