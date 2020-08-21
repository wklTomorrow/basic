/* 
    环形链表
    head=[3,2,0,-4], pos = 1

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

var ss = new createNode()
let s1 = ss.add(3).add(4).add(2)

const hasCircle = (head) => {
    let val = head
    let map = new Map()
    while(val && val.next) {
        if (map.has(val)) return true
        map.set(head, true)
        val = val.next
    }
}

const circle = (head) => {
    let val1 = head
    let val2 = head
    while (val2) {
        if (val2.next === null) return false
        val2 = val2.next.next
        val1 = val1.next
        if (val1 === val2) {
            return true
        }
    }
    return false
}