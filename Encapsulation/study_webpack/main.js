// 通过 CommonJS 规范导入 CSS 模块
require('./main.css');
require('./loader/test');
// 通过 CommonJS 规范导入 show 函数
const show = require('./show.js');
console.log('hello world');
console.log('torrow');
const fn = () => {
    console.log('hello world');
}
fn();
// 执行 show 函数
show('Webpack');