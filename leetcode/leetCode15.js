/* 
    三数之和
    [-1, 0, 1, 2, -1, -4]
    [-1, 0, 1]
    [-1, -1, 2]
*/

let arr = [-1, 0, 1, 2, -1, -4]

function getNum(arr) {
    let map = new Map()
    let arrs = []
    let obj = {}
    arr.sort((a, b) => a - b)
    for (let i = 0; i < arr.length; i++) {
        let start = i + 1
        let end = arr.length - 1
        while(start < end) {
            if (arr[start] + arr[i] + arr[end] > 0) {
                end--
            } else if (arr[start] + arr[i] + arr[end] < 0) {
                start++
            } else {
                let newArr = [arr[i], arr[start], arr[end]] 
                if (!obj[newArr]) {
                    obj[newArr] = 1
                }
                start++
                end--
                while(start < end && arr[start] === arr[start + 1]) {
                    start++
                }
                while(start < end && arr[end] === arr[end -1]) {
                    end--
                }
            }
        }
    }
    return Object.keys(obj)
}
console.log(getNum(arr))