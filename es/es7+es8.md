## 1、ES7
- Array.prototype.includes
  - 能够查到NaN
  - +0、-0被认为相等
- 求幂运算符
> 3 ** 2 === Math.pow(3, 2)

- async/await
```javascript
let sayHello = async function sayHello() {
    let hi = 'hello world'//等同于return Promise.resolve(hi);
    return hi
}
sayHello().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err.message);
})
```
- Object.entries()
  - 会自动忽略symbol
  - ```javascript
    let obj = {foo: 1, bar: 2}
    let map1 = new Map([['foo', 1], ['bar', 2]])
    let map2 = new Map(Object.entries(obj))
    ```
  - 会自动按照数组对象下标进行排序
    ```javascript
    Object.entries({ 3: 'a', 4: 'b', 1: 'c' }) // [[1, 'c'], [3, 'a'], [4, 'b']]
    ```
- Object.values()(根entries一致，返回按照下标进行排序的数组) && Object.keys()
- 字符串填充（padStart, padEnd）
  - ```javascript
    'Vue'.padEnd(10, '_*')           //'Vue_*_*_*_'
    'React'.padEnd(10, 'Hello')      //'ReactHello'
    'JavaScript'.padEnd(10, 'Hi')    //'JavaScript'
    'JavaScript'.padEnd(8, 'Hi')     //'JavaScript'
    ```
- Object.getOwnPropertyDescriptors()

----

## 2、ES8

- Decrator

