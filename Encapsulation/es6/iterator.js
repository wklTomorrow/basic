/**
 * 封装迭代器
 */

const iterator = (() => {
    let value = 0
    return {
        next: function() {
            value++
            return {
                done: value > 2 ? true : false,
                value: value
            }
        }
    }
})()