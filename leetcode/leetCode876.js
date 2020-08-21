/* 
    返回链表的中间节点
    [1,2,3,4,5]
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
let zz = new createNode()
zz.add(1).add(2).add(3).add(4).add(5).add(6)
console.log(zz.next)
function getMid(head) {
    let len = 1
    let val1 = head
    while(val1 && val1.next) {
        val1 = val1.next
        len++
    }
    let num = Math.ceil(len / 2)
    let val2 = head
    while(--num >= 0) {
        val2 = val2.next
        num --
    }
    return val2
}
console.log(getMid(zz.next))

const doubleM = (head) => {
    let val1 = head
    let val2 = head
    while(val2 && val2.next) {
        val1 = val1.next
        val2 = val2.next.next
    }
    return val1
}
console.log(doubleM(zz.next))