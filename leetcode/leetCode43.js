/* 
    两个字符串相乘
    123
    456
    56088
*/

const getNum = (a, b) => {
    let arrNum = [0]
    for (let i = 0 ; i < a.length; i++) {
        let curA = a[a.length - i - 1]
        for (let j = 0; j < b.length; j++) {
            let curB = b[b.length - j - 1]
            let val =  curA * curB
            let pos = arrNum[i + j] ? arrNum[i + j] + val : val
            arrNum[i + j] = pos % 10 
            if (val >= 10) {
                arrNum[i + j + 1] = arrNum[i + j + 1] ? arrNum[i + j + 1] + Math.floor(pos / 10) : Math.floor(pos / 10)
            }
        }
    }
    console.log(arrNum.reverse())
}
getNum('123', '6')
getNum('123', '50')
getNum('123', '456')
/**
 * 第二种
 */
const getMax = (arr, arr2) => {
    let arrNum = Array.from({length: arr.length + arr2.length}, x => 0)
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = arr2.length - 1; j >= 0; j--) {
            const sum = arr[i + j + 1] + arr[i] * arr[j]
            arrNum[i + j + 1] = sum % 10
            arrNum[i + j] += sum / 10 | 0
        }
    }
    console.log(arrNum)
}
getMax('123', '456')