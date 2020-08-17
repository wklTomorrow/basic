/* 输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]
示例 2:

输入: [-1,-100,3,99] 和 k = 2
输出: [3,99,-1,-100]
解释:
向右旋转 1 步: [99,-1,-100,3]
向右旋转 2 步: [3,99,-1,-100]
说明:

尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
要求使用空间复杂度为 O(1) 的 原地 算法。 */
let arr = [1, 2, 3, 4, 5, 6, 7], k = 3
// function getSize(arr, num) {
//     const a1 = arr.slice(0, Math.abs(arr.length - num))
//     const a2 = arr.slice(Math.abs(arr.length - num))
//     return a2.concat(a1)
// }
// function rotate(arr, num) {
//     for (let i = 0; i < num; i++) {
//         let count = arr[arr.length - 1]
//         for (let j = arr.length - 1; j > 0; j--) {
//             arr[j] = arr[j - 1]
//         }
//         arr[0] = count
//     }
//     return arr
// }
const rotate = (arr, k) => {
    let n = k % arr.length
    // 数组先进行反转，后面再次进行反转
    rotateChil(arr, 0, arr.length - 1)
    rotateChil(arr, 0, n - 1)
    rotateChil(arr, n, arr.length - 1)
    return arr
}
function rotateChil(arr, start, end) {
    while (start < end) {
        ;[arr[start], arr[end]] = [arr[end], arr[start]]
        start++
        end--
    }
}
let arr1 = [1, 2],n = 3
console.log(rotate(arr, k))
console.log(rotate(arr1, n))