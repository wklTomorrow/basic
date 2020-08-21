/* 
    最长无重复字串
    abcabcab // abc
*/
let str = 'abcabcd'
const longStr = str => {
    let arr = [], max = 0
    for (let i = 0; i < str.length; i++) {
        let s = str.charAt(i)
        let index = arr.indexOf(s)
        if (index !== -1) {
            arr.splice(s + 1, 1)
        }
        arr.push(s)
        max = Math.max(arr.length, max)
    }
    return max
}
console.log(longStr(str))

const longMap = str => {
    let map = new Map(), max = 0
    for (let i = 0, j = 0; i < str.length; i++) {
        if (map.has(str[i])) {
            j = Math.max(map.get(str[i]) + 1, j)
        }
        max = Math.max(max, i - j + 1)
        map.set(str[i], i)
    }
    return max
}
console.log(longMap(str))
// 'abca'

const longSlice = function(str) {
    let max = 0
    for (let i = 0, j = 0; j < str.length; j++) {
        let index = str.slice(i, j).indexOf(str[j])
        if (index !== -1) {
            i = i + index + 1
        }
        max = Math.max(max, j - i + 1)
    }
    return max
}
console.log(longSlice(str))