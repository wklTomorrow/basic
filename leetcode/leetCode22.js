/* 
    括号生成问题
    左括号与右括号，生成对问题
*/
const getNum = (num) => {
    let arr = []
    getMax(num, num, '', arr)
    return arr
}
const getMax = (left, right, str, arr) => {
    if (right > left) return
    if (left === 0 && right === 0) {
        arr.push(str)
    } else {
        if (left > 0) {
            getMax(left - 1, right, str +')', arr)
        }
        if (right > 0) {
            getMax(left, right - 1, str + '(', arr)
        }
    }
}
// var list = []
// let F = function (n) {
//     if (list[n]) {
//         return list[n]
//     }
//     let res = []
//     if (n == 0 || n == 1) {
//         list[0] = ['']
//         list[1] = ['()']
//         return list[n]
//     }
//     for (let i = 0; i < n; i++) {
//         let cur = F(i)
//         let remain = F(n - i - 1)
//         // console.log(cur, remain)
//         for (let z = 0; z < cur.length; z++) {
//             // let str = '(' + cur[z] + ')'
//             let str = '(' + cur[z] + ')'
//             for (let j = 0; j < remain.length; j++) {
//                 str = str + remain[j]
//                 res.push(str)
//             }
//         }
//     }
//     list[n] = res
//     return list[n]
// }
// console.log(F(3))
let F = function(n) {
    let arr = [n, n]
    function getThis(a, cur) {
        let curArr = [...a]
        let left = []
        let right = []
        if (curArr[0] > curArr[1]) {
            return []
        } else if (curArr[1] === 0) {
            return [')']
        } else {
            if (curArr[0] === 0) {
                curArr[1]--
                right = getThis(curArr, ')')
                for (let i = 0; i < right.length; i++) {
                    right[i] = cur + right[i]
                }
                return right
            } else {
                curArr[0]--
                left = getThis(curArr, '(')
                for (let i = 0; i < left.length; i++) {
                    left[i] = cur + left[i]
                }
                curArr[0]++
                curArr[1]--
                right = getThis(curArr, ')')
                for (let i = 0; i < right.length; i++) {
                    right[i] = cur + right[i]
                }
                return left.concat(right)
            }
        }
    }
    return getThis(arr, '')
}
console.log(F(3))
// var generateParenthesis = function (n) {
//     let res = [];
//     //  cur :当前字符  left：当前字符左括号 right:当前字符右括号
//     const help = (cur, left, right) => {
//         if (cur.length === 2 * n) {
//             res.push(cur);
//             return;
//         }
//         if (left < n) {
//             help(cur + "(", left + 1, right)
//         }
//         if (right < left) {
//             help(cur + ")", left, right + 1);
//         }
//     };
//     help("", 0, 0);
//     return res;
// };
console.log(getNum(3))