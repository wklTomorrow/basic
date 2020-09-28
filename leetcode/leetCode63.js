/* 
    机器人所有路径
*/
/**
 * 机器人到达路径的所有方法
 * @param {number} m 
 * @param {number} n 
 */
const getNum = (m, n) => {
    let arr = new Array(n)
    for (let i = 0; i < n; i++) {
        arr[i] = new Array(m)
        arr[i][0] = 1
    }
    for (let i = 0; i < m; i++) {
        arr[0][i] = 1
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            arr[i][j] = arr[i - 1][j] + arr[i][j - 1]
        }
    }
    return arr[n - 1][m - 1]
}
// ???
const getStr = (m, n) => {
    let arr = Array.from({length: n}, x => 1)
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            arr[j] = arr[j - 1] + arr[j]
        }
    }
    return arr[n - 1]
}
// console.log(getStr(3, 2))

const getMin = arr => {
    let len = arr.length
    let bLen = arr[0].length
    let newArr = Array.from({length: len}, x => 0)
    for (let i = 0; i < len; i++) {
        newArr[i] = Array.from({length: bLen}, x => 0)
        newArr[i][0] = arr[i][0] === 1 ? 0 : 1
    } 
    for (let i = 0; i < bLen; i++) {
        newArr[0][i] = arr[0][i] === 1 ? 0 : 1
    }
    for (let i = 1; i < len; i++) {
        for (let j = 1; j < bLen; j++) {
            if (arr[i][j] === 1) {
                newArr[i][j] = 0
            } else {
                newArr[i][j] = newArr[i - 1][j] + newArr[i][j - 1]
            }
        }
    }
    return newArr[len - 1][bLen - 1]
}

console.log(getMin([[0,0,1],[0,1,0],[0,0,0]]))