/* 
    1,2,3,4,5
    5,4,3,2,1
*/
function createNode() {
    this.next = null
    this.size = 0
}
function LinkNode(val) {
    this.val = val
    this.next = null
}
createNode.prototype.getSize = function(n) {
    let v = this.next
    for (let i = 0; i <= this.size; i++) {
        if (n == i) {
            return v
        }
        v = v.next
    }
}
createNode.prototype.add = function(val) {
    if (this.size == 0 ) {
        this.next = new LinkNode(val)
    } else {
        let v = this.getSize(this.size - 1)
        v.next = new LinkNode(val)
    }
    this.size ++
    return this
}

createNode.prototype.to = function() {
    let arr = []
    let v = this.next
    while(v) {
        arr.push(v.val)
        v = v.next
    }
    return arr.join('->')
}

var ss = new createNode()
ss.add(1).add(2).add(3).add(4).add(5)
console.log(ss.to())
function rotate(head) {
    let a1 = head
    while(a1 && a1.next) {
        let end = a1.next
        a1.next = a1.next.next
        end.next = head
        head = end
    }
    return head
}
console.log(rotate(ss.next))
// 迭代法
// 1,2,3,4,5
// function rotate(head) {
//     let a1 = head
//     while(a1 && a1.next) {
//         let end = a1.next
//         a1.next = a1.next.next
//         end.next = head
//         head = end
//     }
//     return head
// }
// console.log(rotate(ss.next))

// 递归法
// function fn(head) {
//     if (head && !head.next) return head
//     let newCode = fn(head.next)
//     head.next.next = head
//     head.next = null
//     return newCode
// }
// console.log(fn(ss.next).to())