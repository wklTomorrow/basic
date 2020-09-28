/* 
    最小路径之和
*/
let arr = [
    [1,3,1],
    [4,5,1],
    [3,6,1]
]

const getMin = arr => {
    let len1 = arr.length
    let len2 = arr[0].length
    let newArr = Array.from({length: len1}, x => 0)
    for (let i = 0; i < len1; i++) {
        newArr[i] = Array.from({length: len2}, x => 0)
        newArr[i][0] = arr[i][0]
        if (i > 0) {
            newArr[i][0] = newArr[i][0] + newArr[i - 1][0]
        }
    }
    for (let i = 0; i < len2; i++) {
        newArr[0][i] = arr[0][i]
        if (i > 0) {
            newArr[0][i] = newArr[0][i] + newArr[0][i - 1]
        }
    }
    for (let i = 1; i < len1; i++) {
        for (let j = 1; j < len2; j++) {
            newArr[i][j] = Math.min(arr[i][j] + newArr[i - 1][j], arr[i][j] + newArr[i][j - 1])
        }
    }
    return newArr[len1 - 1][len2 - 1]
}
console.log(getMin(arr))