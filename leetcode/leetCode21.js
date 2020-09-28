/* 
    合并两个有序链表
*/

const merge = (a, b) => {
    let head = null
    while (a.next && b.next) {
        if (a.value > b.value) {
            head.next = b.value
            b = b.next
            head.next.next = null
        } else {
            head.next = a.value
            a = a.next
            head.next.next = null
        }
    }
    if (a.next) {
        head.next = a.next
    }
    if (b.next) {
        head.next = b.next
    }
}

var mergeTwoLists = function(l1, l2) {
    var newL = new ListNode() // 新建链表
    var res = newL
 
    while(l1 !== null && l2 !== null){ //循环链表 比较大小进行赋值
        if(l1.val < l2.val){
            newL.next = l1
            l1=l1.next // next到下一位（这点很重要）
        } else {
            newL.next = l2
            l2=l2.next //同上，很重要
        }
        newL = newL.next // next到下一位，重要
    }
    newL.next = (l1 === null) ? l2 : l1  // 当其中一个循环完毕后，将另一个直接赋值过去
 
    return res.next
};