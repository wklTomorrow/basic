/* 
    数组中第k个最大元素
*/
let arr = [3,2,1,5,6,4]
let a = [3,2,3,1,2,4,5,5,6]

const getNum = (arr, k) => {
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        let n = arr[i]
        if (obj[n]) {
            obj[n] + 1
        } else {
            obj[n] = 1
        }
    }
    let bArr = Object.keys(obj)
    bArr.sort((x, y) => x - y)
    return bArr[bArr.length - k]
}
