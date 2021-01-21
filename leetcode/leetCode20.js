/* 
    有效的括号数
    {}，（），【】
*/

const getFlag = str => {
    if (str % 2 == 1) {
        return false
    }
    let arr = []
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            arr.push(')')
        } else if (str[i] === '{') {
            arr.push('}')
        } else if (str[i] === '[') {
            arr.push(']')
        } else if (arr.pop() !== str[i]) {
            return false
        }
    }
    return !arr.length
}

const getStr = str => {
    let obj = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    let newArr = []
    for (let i = 0; i < str.length; i++) {
        if (obj[str[i]]) {
            newArr.push(obj[str[i]])
        } else {
            if (newArr.pop() !== str[i]) {
                return false
            }
        }
    }
    return newArr.length == 0
}