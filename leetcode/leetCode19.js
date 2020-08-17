// 删除链表的倒数第N个元素
// 1，2，3 ，4，5. n = 2 变成1，2，3，5
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
zz.add(1).add(2).add(3).add(4).add(5)
const deleteNode = (a, n) => {
    let a1 = a
    let a2 = a
    while(n--) {
        a1 = a1.next
    }
    while(a1 && a1.next) {
        a1 = a1.next
        a2 = a2.next
    }
    a2.next = a2.next.next
    return a
}
console.log(deleteNode(zz.next, 2))
