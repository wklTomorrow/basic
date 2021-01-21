/* 
    前k个高频元素
*/

const getNum = (arr, k) => {
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        let n = arr[i]
        if (obj[n]) {
            obj[n] += 1
        } else {
            obj[n] = 1
        }
    }
    let bArr = Object.keys(obj)
    bArr.sort((x, y) => obj[x] - obj[y])
    return bArr[bArr.length - k]
}
