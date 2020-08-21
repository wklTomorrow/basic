/* 
    1,2,3,4,5 k=2
    4,5,1,2,3
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
zz.add(1).add(2).add(3).add(4).add(5)
// console.log(zz.next)
function rotate(head, val) {
    let len = 1
    let b = head
    while(b && b.next) {
        b = b.next
        len++
    }
    let move = len - val % len - 1
    let a = head
    while (move > 0) {
        a = a.next
        move--
    }
    b.next = head
    let ss = a.next
    a.next = null
    return ss
}
console.log(rotate(zz.next, 2))
// function rotate(val, k) {
//     let len = 1
//     let b = val
//     while(b && b.next) {
//         b = b.next
//         len++
//     }
//     let move = len - k % len
//     let a = val
//     while(--move > 0) {
//         a = a.next
//     }
//     b.next = val
//     let newHead = a.next
//     a.next = null
//     return newHead
// }

// console.log(rotate(zz.next, 2))
