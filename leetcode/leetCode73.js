/**
 * 矩阵清0
 */
/* 
    
*/

let arr = [
    [1,2,3],
    [4,0,6],
    [7,8,9]
]

const getArr = arr => {
    let newArr = []
    for(let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 0) {
                newArr.push([i, j])
            }
        }
    }
    console.log(newArr)
}
getArr(arr)

/* 
    反转链表
    1，2，3，4，5
    5，4，3，2，1
    let a = head
    while(a && a.next) {
        let end = a.next
        a.next = a.next.next
        end.next = head
        head = end 
    }
*/