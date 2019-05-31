(function () {
    'use strict'

    var Animal = function (name,age) {
        this.name = name;
        this.age = age;
        this.say = function () {
            console.log(this.name + ":" + this.age)
        }
    }

    Animal.prototype.sayMe = function () {
        console.log("我是："+this.name+ "："+this.age)
    }
    var cat = new Animal("小猫",3);
    cat.say();
    // 寄生组合
    //call()  apply()
    //调用一个对象的一个方法，用另一个对象替换当前对象
    Animal.prototype.sayMe.call(cat);
})();