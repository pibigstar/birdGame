//变量缓存器，方便我们在不同的类中访问和修改变量
export class DataStore {

    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance
    }

    constructor(){
        //内部map，主要用来存储后期需要销毁的资源
        this.map = new Map();
    }

    put(key, value){
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }

    get(key) {
        return this.map.get(key);
    }
    // 销毁
    destroy(){
        for(let value of this.map.values()){
            value = null;
        }
    }

}