/* 
    最长的回文串
*/

const getMaxStr = str => {
    let s = ''
    const getStr = (left, right) => {
        while(left >= 0 && right < str.length && str[left] === str[right]) {
            if (right - left + 1 >= s.length) {
                s = str.slice(left, right + 1)
            }
            left--
            right++
        }
    }
    for (let i = 0; i < str.length; i++) {
        getStr(i, i + 1)
        getStr(i - 1, i + 1)
    }
    return s
}
console.log(getMaxStr('bb'))