/* 
    杨辉三角
    let arr = [
         [1],
      [1,1],
      [1,2,1],
      [1,3,3,1]
    ]
*/
/**
 * 返回杨辉三角形
 * @param {number} num 
 */
const getArr = num => {
    let newArr = Array.from({length: num}, x => [])
    for (let i = 0; i < num; i++) {
        newArr[i] = Array.from({length: i + 1}, x => 1)
    }
    for (let i = 2; i < num; i++) {
        for (let j = 1; j < newArr[i].length - 1; j++) {
            newArr[i][j] = newArr[i - 1][j - 1] + newArr[i - 1][j]
        }
    }
    console.log(newArr)
}
getArr(5)
