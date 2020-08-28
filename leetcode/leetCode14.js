/* 
    最长公共前缀
    ['flower', 'flow', 'flight'] // 'fl'
*/
let arr = ['flower', 'flow', 'flight']
function getThis(arr) {
    let str = ''
    for (let i = 0; i < arr[0].length; i++) {
        str += arr[0][i]
        let flag = true
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].indexOf(str) === -1) {
                flag = false
                break
            }
        }
        if (!flag) {
            str = str.replace(str[str.length - 1], '')
            break
        }
    } 
    return str
}
console.log(getThis(arr))

// 分治法

function getStr (arr) {
    return devide(arr, 0 , arr.length - 1)
}
function devide(arr, left, right) {
    if (left === right) {
        return arr[left]
    }
    let len = Math.floor((right + left) / 2)
    let l = devide(arr, left, len)
    let r = devide(arr, len + 1, right)
    return compare(l, r) 
}
function compare(left, right) {
    let min = Math.min(left.length, right.length)
    for (let i = 0; i < min; i++) {
        if (left[i] !== right[i]) {
            return left.slice(0, i)
        }
    }
    return left.slice(0, min)
}
console.log(getStr(arr))