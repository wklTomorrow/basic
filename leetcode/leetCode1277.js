/* 
    统计正方形的个数
    正方形边长为
*/
let arr1 = [
    [0,1,1,1],
    [1,1,1,1],
    [0,1,1,1]
]
let arr2 = [
    [1,0,1],
    [1,1,0],
    [1,1,0]
]

const getArr = arr => {
    let len1 = arr.length
    let len2 = arr[0].length
    let min = Math.min(len1, len2)
    let newArr = Array.from({length: len1 + 1}, x => 0)
    for (let i = 0; i < len1; i++) {
        newArr[i] = Array.from({length: len2 + 1}, x => 0)
    }
    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
            let num = 0
            if (arr[i][j]) {
                num += 1
                let a = i + 1
                let b = j + 1
                while(a <= min && b <= min) {
                    if (arr[a][j] && arr[i][b] && arr[a][b]) {
                        num += 1
                        a++
                        b++
                    } else {
                        break
                    }
                }
            }
            newArr[i][j] = num
        }
    }
    console.log(newArr)
}
getArr(arr1)