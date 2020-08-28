/* 
    整数反转
*/
/**
 * 
 * @param {number} num 
 */
function reverse(num) {
    let flag = 1
    if (num < 0) {
        flag = -1
    }
    let arr = Math.abs(num).toString().split('').reverse()
    arr.map(e => {
        if (e != 0) {
            return e
        }
    })
    return arr.join('') * flag 
}
/**
 * 
 * @param {number} num 
 */
const getNum = (num) => {
    let val = ''
    while(num > 0) {
        val = val + (num % 10 == 0 ? val ? 0 : '' : num % 10)
        num = Math.floor(num / 10)
    }
    return val
}