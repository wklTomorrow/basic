// 复制带有随机指针的链表
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