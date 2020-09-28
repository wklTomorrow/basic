# meeting

## 1、关于新建对象的三种方式比较
```javascript
let a = {} // 对象字面量，直接复制
let b = Object.created(null)
let c = new Object() // 本质上通过构造函数进行方法调用
// a与c只是初始化的过程有区别 后者通过构造函数创建对象，前者直接创建json对象，都是创建空对象
```
---
## 2、VUE数组相应式
> + 为什么不能监听数组的变化
>   - 不是```Object.defineProperty```问题
>   - vue响应式是通过```set```进行监听的，
>   - 对于新增的属性，需要重新手动调用obverse
>   - vue初始化数组，为每个对象添加getter与setter
> + 可监听的数组变化
>   - ```push```
>   - ```unshift```
>   - ```pop```
>   - ```shift```
>   - ```reverse```
>   - ```sort```
>   - ```splice```
> + ```Object.defineProperty 与Proxy```
>   - 第一个是只劫持对象属性，新增属性的时候还要进行define，来进行劫持，```proxy```是直接代理
>   - 第一种对新增属性是要手动进行Observe的，所以在新增属性的时候需要重新遍历进行劫持，```proxy```是直接通过```set(target, propKey, value, receiver)```进行拦截

---
## 3、关于let、const块级作用域的理解

+ 在js中，只有两个作用域，函数作用域，全局作用域，ES6中新增了块级作用域，只要是{}就是块级作用域，if语句，for语句也是块级作用域
+ let、const,不可以跨块访问，var属性可以跨块访问，但不能跨函数作用域进行访问

---

## 4、封装new操作符
```javascript
/**
 * new操作符封装
 * @params {function} fn
 * @params {array} arg
 */
function _new(fn, ...arg) {
    let obj = Object.create(fn.prototype)
    let ret = fn.apply(obj, arg)
    return (typeof ret === 'function' || typeof ret === 'object') ? ret : obj
}
```
---
## 5、bind,call,apply函数的封装,函数的柯里化
```javascript
/**
 * call操作符
 */
Function.prototype._call = function(objs) {
    let obj = objs || window
    obj.fn = this
    obj.fn(...[...arguments].slice(1))
    delete obj.fn
}
function say(s,y) {
    console.log(this.a + this.b, s + y)
}
let objs = {
    a: 1,
    b: 2
}
say._call(objs, 3, 4)
/**
 * apply操作符
 */
Function.prototype._apply = function(objs) {
    let obj = objs || window
    obj.fn = this
    obj.fn(...arguments[1])
    delete obj.fn
}
function say(s,y) {
    console.log(this.a + this.b, s + y)
}
let objs = {
    a: 1,
    b: 2
}
say._apply(objs, [3, 4])
/**
 * bind操作符
 */
Function.prototype._bind = function(oThis) {
    let fn = this
    let arg = [...arguments].slice(1)
    return function () {
        fn.apply(oThis, arg)
    }
}
/**
 * 柯里化函数
 */
function curry(fn, ...res) {
    let len = fn.length
    let arg = [...res]
    return function () {
        arg.push(...arguments)
        if (arg.length < len) {
            return curry.call(this, fn, arg)
        }
        return fn.apply(undefined, arg)
    }
}
let fn = function(a, b, c) {
    return a + b + c
}
let fn1 = new curry(fn, 1)
console.log(fn1(2,3))
```

## 6、webpack相关
> webpack: loader相关
> webpack与gulp区别
- gulp强调的是前端开发流程，一个流程中有多个task，按照顺序执行
- webpack是一个前端模块化工具，把所有的文件打包成生成所需的文件