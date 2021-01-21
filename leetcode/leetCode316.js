/* 
    去除重复字母，并按照字典序排列
*/

let str = 'bcbbbaazzz'

const getStr = s => {
    let arr = []
    for (let i = 0; i < s.length; i++) {
        if (!arr.includes(s[i])) {
            arr.push(s[i])
        }
    }
    return arr
}

getStr(str)