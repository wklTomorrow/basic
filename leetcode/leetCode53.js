/* 
    最长的连续子序列和
*/

let arr = [-2,1,-3,4,-1,2,1,-5,4]

const getNum = arr => {
    let num = 0
    let max = 0
    for (let i = 0; i < arr.length; i++) {
        if (max + arr[i] > 0) {
            max = max + arr[i]
            num = Math.max(num, max)
        } else {
            max = 0
        }
    }
    return num
}
console.log(getNum(arr))