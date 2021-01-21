/* 
    对称二叉树

*/
// 实现二叉树
class Node {
    constructor(key) {
        this.data = key
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }
    insert(data) {
        let node = new Node(data)
        const insertNode = (node, newNode) => {
            if (newNode.data < node.data) {
                if (node.left) {
                    insertNode(node.left, newNode)
                } else {
                    node.left = newNode
                }
            } else {
                if (node.right) {
                    insertNode(node.right, newNode)
                } else {
                    node.right = newNode
                }
            }
        }
        if (this.root) {
            insertNode(this.root, node)
        } else {
            this.root = node
        }
    }
}

let node = new BST()
// let arr = [1,2,2,3,4,4,3]
let arr = [8,3,10,1,6,14,4,7,13]
arr.forEach(e => {
    node.insert(e)
})

const isSymmetric = function(node) {
    if (!node) {
        return true
    }
    const leftAndRight = function(left, right) {
        if (!left && !right) {
            return true
        }
        if (!left || !right) return false
        if (left.data !== right.data) {
            return false
        }
        return leftAndRight(left.left, left.right) && leftAndRight(right.left, right.right)
    }
    return leftAndRight(node.root.left, node.root.right)
}
console.log(isSymmetric(node))
