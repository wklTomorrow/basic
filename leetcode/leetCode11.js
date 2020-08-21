/* 
    盛水最多的容器
    [1, 8, 6, 2, 5, 4, 8, 3, 7] // 49
*/

let arr = [1, 8, 6, 2, 5, 4, 8, 3, 7]
const getMax = arr => {
    let max = 0
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            let lang = arr[i] > arr[j] ? arr[j] : arr[i]
            max = Math.max(max, lang * (j - i))
        }
    }
    return max
}
console.log(getMax(arr))

// 双指针方式

const getM = function(arr) {
    let min = 0
    let height = arr.length - 1
    let max = 0
    while (min < height) {
        let res = (height - min) * Math.min.call(this, arr[min], arr[height])
        max = Math.max.apply(this, [max, res])
        if (arr[min] < arr[height]) {
            min++
        } else {
            height--
        }
    }
    return max
}
console.log(getM(arr))