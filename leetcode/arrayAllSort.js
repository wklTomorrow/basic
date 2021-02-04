const arr = [1, 2, 3, 4]

function getArr(arr) {
    if (!arr.length) return []
    let allArr = []
    for (let i = 0; i < arr.length; i++) {
        let splArr = JSON.parse(JSON.stringify(arr))
        splArr.splice(i, 1)
        let a = getArr(splArr)
        if (a.length) {
            a.forEach(ele => {
                allArr.push(arr[i] + '' + ele)
            })
        } else {
            allArr = [arr[i]]
        }
    }
    return allArr
}

console.log(getArr(arr))