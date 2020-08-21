/* 
    快乐数
    无限循环每位平方和最终为1就为快乐数
    19 是快乐数

    快慢指针
*/
function Happy(num) {
    if (num === 1) {
        return true
    }
    let arr = num.toString().split('')
    let nums = arr.reduce((x, y) => {
        return x + y * y
    }, 0)
    return Happy(nums)
}
const isHappy = (num) => {
    let val = 0
    while (num !== 1) {
        if (num === 4) {
            return false
        }
        while (num !== 0) {
            val += Math.pow(num % 10, 2)
            num = Math.floor(num / 10)
        }
        num = val
        val = 0
    }
    return true
}
console.log(Happy(19))
console.log(isHappy(19))
console.log(isHappy(4))

const fast = (num) => {
    let slow = sum(num)
    let fa = sum(slow)
    while(slow != fa) {
        slow = sum(slow)
        fa = sum(sum(fa))
    }
    return slow == 1
}

const sum = (num) => {
    let val = 0
    while(num !== 0) {
        val += Math.pow(num % 10, 2)
        num = Math.floor(num / 10)
    }
    return val
}
console.log(sum(19))
console.log(sum(4))
console.log(fast(19))
console.log(fast(4))