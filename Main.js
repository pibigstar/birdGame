import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

//初始化整个游戏的精灵，作为游戏开始的入口
export class Main {

    //构造方法
    constructor(){
        this.canvas = document.getElementById("game_canvas")
        this.ctx = this.canvas.getContext("2d");
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map))
    }
    //当资源第一次被完全加载
    onResourceFirstLoaded(map){
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }
    //初始化游戏
    init() {
        this.director.isGameOver = false;
        // 存储游戏元素中的对象
        this.dataStore
            .put("background", BackGround)
            .put("land", Land)
            .put("pencils", [])
            .put("birds",Birds)
            .put("startButton",StartButton)
            .put("score",Score);

        this.registerEvent();
        //创建铅笔要在游戏运行之前
        this.director.createPencil();
        this.director.run();
    }

    //注册事件
    registerEvent(){
        this.canvas.addEventListener("touchstart", e => {
            //屏蔽事件冒泡
            e.preventDefault();
            if(this.director.isGameOver){
                this.init();
            } else {
                this.director.birdsEvent();
            }
        })
    }

}