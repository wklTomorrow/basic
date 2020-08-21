/* 
    买股票的最佳时机
    [7,1,5,3,6,4] // 5
    [7,6,4,3,1] // 0
*/
let arr = [7,1,5,3,6,4]

const getTic = arr => {
    let num = 0
    for (let i = 0; i < arr.length; i++) {
        let j = i + 1
        while(j < arr.length) {
            if (arr[j] > arr[i]) {
                num = Math.max(num, arr[j] - arr[i])
            }
            j++
        }
    }
    return num
}
console.log(getTic(arr))

const getMax = function(arr) {
    let i = 0
    let j = arr.length - 1
    let num = 0
    while(i <= j) {
        if (arr[i] < arr[j]) {
            num = Math.max(num, arr[j] - arr[i])
        } 
        if (i == j) {
            i = 0
            j = j - 1
        }
        if (j == 1) {
            break
        }
        i++
    }
    return num
}
console.log(getMax(arr))
console.log(getMax([7,6,4,3,1]))

const getMoney = (arr) => {
    let num = 0
    let minP = arr[0]
    for (let i = 0; i < arr.length; i++) {
        minP = Math.min(minP, arr[i])
        num = Math.max(num, arr[i] - minP)
    }
    return num
}
console.log(getMoney(arr))
console.log(getMoney([7,6,4,3,1]))