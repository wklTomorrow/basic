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
var a = new createNode()
let s2 = a.add(5).add(6).add(4)

console.log(s1.next, s2.next)

const fn = (a1, a2) => {
    let sum
    let s1 = 0
    let v = 0
    var zz = new createNode()
    while(a1 || a2) {
        a1.val = a1.val ? a1.val : 0
        a2.val = a2.val ? a2.val : 0
        sum = a1.val + a2.val + s1
        if (sum >= 10) {
            sum = sum % 10
            s1 = 1
        } else {
            s1 = 0
        }
        zz.add(sum)
        a1 = a1.next ? a1.next : null
        a2 = a2.next ? a2.next : null
    }
    return zz
}
console.log(fn(s1.next, s2.next))