let arr = [11,7,5,3,6,9,8,10,20,14,12,25,18]
/* 
    js实现顺序二叉树
    前序遍历 => 1.访问根节点； 2.访问左子树； 3.访问右子树
    中序遍历 =>
        1.访问左子树(先访问左子树中的左子树，再访问左子树中的右子树)；
        2.访问根
        3.访问右子树(先访问右子树中的左子树，再访问右子树中的右子树)
 
    可以起到排序作用
    后序遍历 =>
        1.访问左子树。（先访问左子树中的左子树，再访问左子树中的右子树）
        2.访问右子树。（先访问右子树中的左子树，再访问右子树中的右子树）
        3.访问根
*/

class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

function BST(arr) {
    this.root = null
}

BST.prototype.insert = function(value) {
    if (this.root) {
        this.insertNode(this.root, new Node(value))
    } else {
        this.root = new Node(value)
    }
}

BST.prototype.insertNode = function(root, node) {
    if (root.data > node.data) {
        if (root.left) {
            this.insertNode(root.left, node)
        } else {
            root.left = node
        }
    } else {
        if (root.right) {
            this.insertNode(root.right, node)
        } else {
            root.right = node
        }
    }   
}
// 中序遍历
BST.prototype.midOrder = function () {
    let midArr = []
    const getMid = (node) => {
        if (node) {
            getMid(node.left)
            midArr.push(node.data)
            getMid(node.right)
        }
    }
    getMid(this.root)
    return midArr
}
// 前序遍历
BST.prototype.preOrder = function() {
    let preArr = []
    const getPre = node => {
        if (node) {
            preArr.push(node.data)
            getPre(node.left)
            getPre(node.right)
        }
    }
    getPre(this.root)
    return preArr
}

// 后序遍历
BST.prototype.endOrder = function() {
    let endArr = []
    const getEnd = node => {
        if (node) {
            getEnd(node.left)
            getEnd(node.right)
            endArr.push(node.data)
        }
    }
    getEnd(this.root)
    return endArr
}

// 查找最小值
BST.prototype.getMin = function() {
    const min = (node) => {
        return node.left ? min(node.left) : node.data
    } 
    return min(this.root)
}

// 查找最大值
BST.prototype.getMax = function() {
    const max = (node) => {
        return node.right ? max(node.right) : node.data
    }
    return max(this.root)
}
// 查找特定的节点值
BST.prototype.getValue = function(val) {
    const getV = function(v) {
        if (v.data === val) {
            return v
        } else {
            if (v.data > val) {
                return getV(v.left)
            } else {
                return getV(v.right)
            }
        }
    }
    return getV(this.root)
}
// 删除节点，并返回新的二叉树
BST.prototype.deleteNode = function(node) {
    if (node === this.root.data) {
        this.root = null
    }
    const deleteN = (root) => {
        if (root) {
            if (root.left.data === node) {
                root.left = null
            }
            if (root.right.data === node) {
                root.right = null
            }
        }
    }
    deleteN(this.root)
    return this.root
}
let bst = new BST()

// bst.insert(10)
arr.forEach(ele => {
    bst.insert(ele)
})
console.log(bst)
