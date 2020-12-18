/**
 * 原型链与原型的
 */

/**
 * function 测试
 * @param {any} name 
 */
function TestFunction(name) {
    this.name = name;
}

let fn = new TestFunction('test');
/**
 * 打印fn原型
 */
console.log(
    fn.__proto__,
    fn.__proto__ === TestFunction.prototype, // true
    TestFunction.prototype,
    TestFunction.prototype.constructor === TestFunction, // true
    TestFunction.prototype.__proto__,
    TestFunction.prototype.__proto__ === Object.prototype, // true
    Object.prototype.__proto__ === null // true
);
/**
 * 打印Function相关原型
 */

console.log(
    TestFunction.__proto__ === Function.prototype,
    Function.prototype.constructor === Function,
    Function.__proto__ === Function.prototype
)

/**
 * Objcet实例
 */
let obj = new Object({
    name: 'wang',
    age: 10
})
let obj2 = {
    name: 'wang',
    age: 10
}
// console.log(obj, obj2)
/**
 * 打印实例对象原型属性
 */
console.log(
    obj.__proto__ === Object.prototype,
    Object.prototype.constructor === Object,
    Object.__proto__ === Function.prototype,
    Function.prototype.__proto__ === Object.prototype
)