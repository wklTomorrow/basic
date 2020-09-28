let arr = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]
// 123481211109567
/**
 * 螺旋矩阵
 * @param {Array} arr 
 */
const getArr = (arr) => {
/*
    4个点
    top
    bottom
    left
    right
 */
    let top = 0,
        bottom = arr.length - 1,
        left = 0
        right = arr[0].length - 1,
        newArr = []
    while(top <= bottom && left <= right) {
        for (let i = left; i < right; i++) {
            newArr.push(arr[top][i])
        }
        for (let j = top; j < bottom; j++) {
            newArr.push(arr[j][right])
        }
        for (let z = right; z > left; z--) {
            newArr.push(arr[bottom][z])
        }
        for (let h = bottom; h > top; h--) {
            newArr.push(arr[h][left])
        }
        top = top + 1
        right = right - 1
        bottom = bottom - 1
        left = left + 1
    }
    console.log(newArr)
}
getArr(arr)