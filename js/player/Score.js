import {DataStore} from "../base/DataStore.js";

//计分器类
export class Score {

    constructor(){
        this.ctx = DataStore.getInstance().ctx;
        this.score = 0;
        //因为Canvas刷新太快，需要一个变量控制加分，只加一次
        this.isScore = true;
    }

    draw(){
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ff340a'
        this.ctx.fillText(this.score,window.innerWidth/2,window.innerHeight/18,1000)
    }
}