/* 
    爬楼梯
*/
const getMax = (n) => {
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    return getMax(n - 1) + getMax(n - 2)
}
cost = [10, 15, 20]
// let cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
const getMinVal = (arr) => {
    let minArr = [0, 0]
    for (let i = 2; i <= arr.length; i++) {
        minArr[i] = Math.min(arr[i - 1] + minArr[i - 1], arr[i - 2] + minArr[i - 2])
    }
    console.log(minArr)
    return minArr[minArr.length - 1]
}
console.log(getMinVal(cost))