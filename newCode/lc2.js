// 计算逆波表达式
/* 
    ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9↵  ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6
*/

let arr = ["2", "1", "+", "3", "*"]
let arr1 = ["4", "13", "5", "/", "+"]

const getNum = arr => {
    let newArr = []
    let obj = ['-', '+', '*', '/']
    let value = 0
    for (let i = 0; i < arr.length; i++) {
        if (obj.includes(arr[i])) {
            if (newArr.length >= 2) {
                let a = newArr.pop()
                let b = newArr.pop()
                let count = 0
                if (arr[i] === '-') {
                    count = b - a
                } else if (arr[i] === '+') {
                    count = parseInt(b) + parseInt(a)
                } else if (arr[i] === '*') {
                    count = b * a
                } else {
                    count = b / a
                }
                newArr.push(count)
                value = count
            }
        } else {
            newArr.push(arr[i])
        }
    }
    return value
}

console.log(getNum(arr))
console.log(getNum(arr1))