/* 
    最小栈
    push, pop, min,时间复杂度为 1
*/

/**
 * 添加双栈
 */

 function Stack(arr = [], val = []) {
     this.arr = arr
     this.val = val
 }

Stack.prototype.push = function (x) {
    this.arr.push(x)
    if (this.val.length) {
        this.val.push(x)
        if (this.val[0] <= x) {
        } else {
            ;[this.val[0], this.val[this.val.length - 1]] = [this.val[this.val.length - 1], this.val[0]]
        }
    } else {
        this.val.push(x)
    }
}

Stack.prototype.min = function() {
    return this.val[0]
}

let s = new Stack()
s.push(1)
s.push(2)
s.push(3)
s.push(0)
console.log(s.min())