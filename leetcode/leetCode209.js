/* 
    长度最小的子数组
    nums = [2,3,1,2,4,3];s=7 return 2
    双指针
*/
let arr = [2,3,1,2,4,3,7]
const getMin = (arr, count) => {
    let num = 0
    for (let j = 0, i = j + 1; i <= arr.length; i++) {
        let curArr = arr.slice(j, i)
        if (curArr.reduce((x, y) => x + y) === count) {
            num = num === 0 ? curArr.length : Math.min(curArr.length, num)
        }
        if (i === arr.length) {
            j++
            i = j
        }
    }
    return num
}
console.log(getMin(arr, 7))

const getArr = (arr, count) => {
    let num = Infinity
    let head = 0
    let end = head + 1
    let curVal = 0
    while(end < arr.length) {
        curVal += arr[end]
        if (curVal > count) {
            curVal -=arr[head]
            head ++
        } else if (curVal < count) {
            end++
        } else {
            num = Math.min(end - head + 1, num)
            end++
            head = end
            curVal = 0
        }
    }
    return num
}

console.log(getMin(arr, 7))