/**
 * 使数组唯一的最小增量
 * [1,1,2,2,3,7]
 */
let arr = [1,1,2,2,3,7]
const getMin = a => {
    let min = 0
    for (let i = 0; i < a.length; i++) {
        let index = a.indexOf(a[i])
        let last = a.lastIndexOf(a[i])
        min += (last - index)
        while (index !== last) {
            index ++
            a[index] ++
        }
    }
    console.log(min)
}
getMin(arr)