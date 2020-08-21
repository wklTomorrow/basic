/* 
    最小编辑距离，包含插入，替换，删除操作
    word1 = 'hello'
    word2 = 'llo'
*/
function exchangeWord(str1, str2) {
    let len1 = str1.length
    let len2 = str2.length
    let newArr = Array.from({length: len1}, x => [])
    for (let i = 0; i <= len1; i++) {
        newArr[i] = Array.from({length: len2}, x=> [])
        for (let j = 0; j <= len2; j++) {
            if (j === 0) {
                newArr[i][j] = i
            } else if (i === 0) {
                newArr[i][j] = j
            } else {
                let count = 1
                if (len1[i] === len2[j]) {
                    count = 0
                }
                newArr[i][j] = Math.min(newArr[i][j - 1] + 1, newArr[i - 1][j] + 1, newArr[i - 1][j - 1] + count)
            }
        }
    }
    console.log(newArr)
    return newArr[len1][len2]
}
console.log(exchangeWord('hello', 'lo'))