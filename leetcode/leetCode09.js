/* 
    回文数
*/
/**
 * 
 * @param {numbe} num 
 */
const isNum = (num) => {
    if (num < 0) {
        return false
    }

}
/**
 * 
 * @param {*} num 
 * @param {*} n
 * @returns 第n位
 */
const getNum = (num, n) => {
    let zz = Math.floor(num % Math.pow(10, n) / Math.pow(10, n - 1))
    return zz
}