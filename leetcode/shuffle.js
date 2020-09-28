/* 
    洗牌算法
*/
let arrs = [1,2,3,4,5,6,7,8,9,10]
const getArr = (arr) => {
    let newArr = []
    for (let i = 0; i < arr.length;) {
        let j = Math.floor(Math.random() * (arr.length - i))
        newArr.push(arr[j])
        arr.splice(j, 1)
    }
    console.log(newArr)
}
getArr(arrs)