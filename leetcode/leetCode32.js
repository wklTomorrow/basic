/* 
    最长有效括号情况
    )()() // 4
    ()())() // 4
*/

const fn = str => {
    let maxLen = 0
    let stack = [-1]
    for (let i = 0; i < str.length; i++) {
        let s = str[i]
        if (s === '(') {
            stack.push(i)
        } else {
            stack.pop()
            if (stack.length) {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1])
            } else {
                stack.push(i)
            }
        }
    }
    return maxLen
}