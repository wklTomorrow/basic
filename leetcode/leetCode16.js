/* 
    最接近的三数之和
    [-1, 2, 1, -4] tar = 1 val = 2
*/

let arr = [-1, 2, 1, -4]

const getMax = (arr, val) => {
    let min
    for (let i = 0; i < arr.length; i++) {
        let s = i + 1
        let end = arr.length - 1
        while(s < end) {
            let num = arr[i] + arr[end] + arr[s] - val
            min = min ? Math.abs(min) > Math.abs(num) ? num : min : num
            end--
        }
    }
    return min + val
}
console.log(getMax(arr, 1))