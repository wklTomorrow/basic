/* 
    删除排序数组中的重复项
    nums = [1,1,2] 返回2，[1,2]
*/
let arr = [0,0,1,1,2,2,3,3]
function onDeleteArr(arr) {
    let num = 0
    arr.map((ele, index) => {
        if (index != 0) {
            if (ele !== arr[index - 1]) {
                arr[num] = ele
                num++
            }
        } else {
            num++
        }
    })
    return num
}
console.log(onDeleteArr([1,1]))