/* 
    正则学习
*/

// let reg = /([a-z]+)([A-Z])+/
// let reg = /[a-z]/g
// let reg = /[1-9][0-9]?/g // 匹配两位数

// let str = '111'

// let str = 'abcD'
// console.log(reg.test(str))
// console.log(str.match(reg))

let str = '<h1>hello world</h1>'
let reg = /<.*?>/

console.log(str.match(reg))

