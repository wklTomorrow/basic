/* 
    各位相加，相加完之后，数值为个位数则返回
*/
/**
 * 
 * @param {number} num 
 */
const getNum = (num) => {
    let numStr = num.toString()
    if (numStr.length > 1) {
        str = numStr.split('').reduce((a, b) => parseInt(a) + parseInt(b))
        numStr = str.toString().length > 1 ? getNum(parseInt(str)) : str
    }
    return numStr
}