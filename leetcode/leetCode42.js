/* 
    接雨水
    [0,1,0,2,1,0,1,3,2,1,2,1] //6
*/
let arr = [0,1,0,2,1,0,1,3,2,1,2,1]
const rain = arr => {
    let left = 0
    let right = arr.length - 1
    let leftMax = 0
    let rightMax = 0
    let count = 0
    while(left <= right) {
        leftMax = Math.max(leftMax, arr[left])
        rightMax = Math.max(rightMax, arr[right])
        if (arr[left] < arr[right]) {
            count += leftMax - arr[left]
            left++
        } else {
            count += rightMax - arr[right]
            right--
        }
    }
    return count
}

// console.log(rain(arr))
// console.log(rain([1,0,2]))


function getRain(arr) {
    let i = 0
    let j = i + 1
    let num = 0
    while (i <= j && j <= arr.length - 1) {
        if (arr[i] == 0 && i !== j) {
            i++
            j++
        } else if (arr[j] >= arr[i] && i !== j) {
            let count = i
            while (count < j) {
                num += arr[i] - arr[count]
                count++
            }
            i = j
            j++
        } else if (i !== j) {
            let flag = false
            for (let z = i + 1; z < arr.length; z++) {
                if (arr[z] >= arr[i]) {
                    flag = true
                    break
                }
            }
            if (!flag) {
                i++
            } else {
                j++
            }
        } else {
            j++
        }
    }
    return num
}
// console.log(getRain(arr))
// console.log(getRain([0,1,0,2,1,0,1,3,2,1,2,1]))