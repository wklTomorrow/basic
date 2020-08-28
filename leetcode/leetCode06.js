/* 
    Z字形变换
    给定一个字符与一个数值
    循环行数为2n - 2    
    h   o
    e  wr
    l o l
    l   d    
*/

let str = 'helloworld'
/**
 * 
 * @param {Sting} str 
 * @param {Number} num 
 */
const getStr = (str, num) => {
    let len = str.length
    let count = 2 * num - 2
    let arr = Array.from({length: num}, x => '')
    for (let i = 0; i < len; i++) {
        let r = i % count
        arr[r > num - 1 ?  count - r : r] += str[i]
    }
    return arr.join('')
}

console.log(getStr(str, 3))