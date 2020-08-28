/* 
    合并区间
    [[1,3],[2,6],[8,10],[15,18]]
*/
let arr = [[1,3],[2,6],[8,10],[15,18]]
const concatArr = (arr) => {
    let i = 0
    let newArr = []
    let curArr = [arr[0]]
    for (let j = i + 1; j < arr.length; j++) {
        if (curArr[curArr.length - 1][0] <= arr[j][0] && curArr[curArr.length - 1][1] >= arr[j][0]) {
            curArr[curArr.length - 1][1] = Math.max(curArr[curArr.length - 1][1], arr[j][1])
        } else {
            curArr.push(arr[j])
        }
    }
    return curArr
}
console.log(concatArr(arr))