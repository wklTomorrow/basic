/* 
    无序数组的最长上升子序列
*/
let arr = [10,9,2,5,3,7,101,18]

/**
 * 最长上升子序列
 * @param {number[]} arr 
 */
const getMax = arr => {
    let len = arr.length
    let newArr = Array.from({length: len}, x => 1)
    for (let i = 1; i < len; i++) {
        let tem = 0
        for (let j = i - 1; j >= 0; j--) {
            if (arr[i] >= arr[j]) {
                tem = Math.max(tem, newArr[j])
            }
        }
        newArr[i] = newArr[i] + tem
    }
    console.log(newArr)
    return Math.max.call(null, ...newArr)
}

console.log(getMax(arr))