/* 
    返回前k个频出现的数字
*/
/**
 * 
 * @param {array} arr 
 * @param {number} num 
 */
const getNum = (arr, num) => {
    let newArr = Array.from(new Set(arr))
    let map = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i], map.get(arr[i]) + 1 )
        } else {
            map.set(arr[i], 1)
        }
    }
    newArr.sort((a, b) => {
        return map.get(b) - map.get(a)
    })
    return newArr.splice(0, num)
}
console.log(getNum([1,2,3,1,2,4], 2))