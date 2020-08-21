/* 
    十大排序算法
*/
let arr = [1, 10, 2, 3, 9, 7, 8, 4, 5, 6]
// 1、选择排序
/* 
    找到数组中最小的那个元素
    将它和数组的第一个元素交换位置(如果第一个元素就是最小元素那么它就和自己交换)。其次，在剩下的元素中找到最小的元素，将它与数组的第二个元素交换位置
    时间复杂度o(n^2)
*/
function selectSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    for (let i = 0; i < arr.length; i++) {
        let min = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j
            }
        }
        ;[arr[min], arr[i]] = [arr[i], arr[min]]
    }
    return arr
}
// console.log(selectSort(arr))

// 2、插入排序
/* 
    当我们给无序数组做排序的时候，为了要插入元素，我们需要腾出空间，将其余所有元素在插入之前都向右移动一位，这种算法我们称之为插入排序。
    时间复杂度o(n^2)
*/

function insertSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    for (let i = 1; i < arr.length; i++) {
        let tem = arr[i]
        let k = i - 1
        while (k >= 0 && arr[i] < arr[k]) {
            k--
        }
        for (let j = i; j > k + 1; j--) {
            arr[j] = arr[j - 1] 
        }
        arr[k + 1] = tem
    }
    return arr
}
// console.log(insertSort(arr))

// 3、冒泡排序
    /* 
        把第一个元素与第二个元素比较，如果第一个比第二个大，则交换他们的位置。接着继续比较第二个与第三个元素，如果第二个比第三个大，则交换他们的位置….
        我们对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样一趟比较交换下来之后，排在最右的元素就会是最大的数。
        时间复杂度o(n^2)
    */

function bubbleSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
    return arr
}
// console.log(bubbleSort(arr))

// 4、希尔排序
    /* 
        插入排序的一种改良，n = arr.length / 2
        时间复杂度O(nlog(n))
    */
function shellSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    let n = Math.floor(arr.length / 2)
    while(n > 0) {
        for (let i = 0; i < arr.length - n; i++) {
            if (arr[i] > arr[i + n]) {
                ;[arr[i], arr[i + n]] = [arr[i + n], arr[i]]
            }
        }
        n = Math.floor(n / 2)
    }
    return arr
}
// console.log(shellSort(arr))

// 5、归并排序
    /* 
        将一个大的无序数组有序，我们可以把大的数组分成两个，然后对这两个数组分别进行排序，
        之后在把这两个数组合并成一个有序的数组。由于两个小的数组都是有序的，所以在合并的时候是很快的。
        通过递归的方式将大的数组一直分割，直到数组的大小为 1，此时只有一个元素，那么该数组就是有序的了，
        之后再把两个数组大小为1的合并成一个大小为2的，再把两个大小为2的合并成4的 ….. 直到全部小的数组合并起来。
    */
function mergeSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    let n = Math.floor(arr.length / 2)
    let left = mergeSort(arr.slice(0, n))
    let right = mergeSort(arr.slice(n))
    return mergeArr(left, right)
}
const mergeArr = (left, right) => {
    let newArr = []
    while(left.length && right.length) {
        if (left[0] > right[0]) {
            newArr.push(right.shift())
        } else {
            newArr.push(left.shift())
        }
    }
    while (left.length) {
        newArr.push(left.shift())
    }
    while (right.length) {
        newArr.push(right.shift())
    }
    return newArr
}
// console.log(mergeSort(arr))

// 6、快速排序
    /* 
    找中间元素，大于中间的放右边，小于的放左边
    时间复杂度（nlog(n)
    */
function quickSort(arr) {
    if (arr.length < 2) {
        return arr
    }
    let mid = Math.floor(arr.length / 2)
    let cur = arr[mid]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < cur) {
            left.push(arr[i])
        }
        if (arr[i] > cur) {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(cur, ...quickSort(right))
}
// console.log(quickSort(arr))

// 7、堆排序
    /* 
        堆的特点就是堆顶的元素是一个最值，大顶堆的堆顶是最大值，小顶堆则是最小值。
        堆排序就是把堆顶的元素与最后一个元素交换，
        交换之后破坏了堆的特性，我们再把堆中剩余的元素再次构成一个大顶堆，然后再把堆顶元素与最后第二个元素交换….如此往复下去，等到剩余的元素只有一个的时候，此时的数组就是有序的了。
        时间复杂度nlog(n)
    */
function heapSort(arr) {
    let n = Math.floor(arr.length / 2)
    for (let i = n; i >= 0; i--) {
        heap_sort(arr, i , arr.length - 1)
    }
    for (let j = arr.length - 1; j > 1; j--) {
        exchage(arr, 0, j)
        heap_sort(arr, 0, j - 1)
    }
    return arr
}
function exchage(arr, i, j) {
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
}
const heap_sort = function (arr, start, end) {
    let left = start * 2 + 1
    let right = start * 2 + 2
    let cur = start
    if (left < end && arr[cur] < arr[left]) {
        cur = left
    }
    if (right < end && arr[cur] < arr[right]) {
        cur = right
    }
    if (start != cur) {
        exchage(arr, start, cur)
        heap_sort(arr, cur, end)
    }
}
// console.log(heapSort(arr))

// 8、计数排序
    
    /* 
        计数排序是一种适合于最大值和最小值的差值不是不是很大的排序。

        基本思想：就是把数组元素作为数组的下标，然后用一个临时数组统计该元素出现的次数
        时间复杂度 n + k（k表示需要排序的数组下标）
    */

function countingSort(arr) {
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    let maxArr = Array.from({length: max + 1}, x => 0)
    for (let i = 0; i < arr.length; i++) {
        maxArr[arr[i]] ++
    }
    let newArr  = []
    for (let j = 0; j < maxArr.length; j ++) {
        while(maxArr[j] > 0) {
            newArr.push(j)
            maxArr[j]--
        }
    }
    return newArr
}
// console.log(countingSort(arr))

// 9、桶排序

/* 
    桶排序就是把最大值和最小值之间的数进行瓜分
    10 个区间，10个区间对应10个桶，我们把各元素放到对应区间的桶中去，再对每个桶中的数进行排序，可以采用归并排序，也可以采用快速排序之类的。
*/
function bucketSort(arr) {
    let n = Math.floor(arr.length / 2)
    let k = 3
    let newArr = Array.from({length: n}, x => [])
    for (let i = 0; i < arr.length; i++) {
        let zz = Math.floor(arr[i] / k)
        newArr[zz].push(arr[i])
    }
    for (let i = 0; i < newArr.length; i++) {
        qSort(newArr[i])
    }
    return [].concat(...newArr)
}

const qSort = (arr) => {
    if (arr.length) {
        for (let i = 1; i < arr.length; i++) {
            let cur = arr[i]
            let k = i - 1
            while(k >= 0 && arr[k] > cur) {
                arr[k + 1] = arr[k]
                k --
            }
            arr[k + 1] = cur
        }
    }
}
// console.log(bucketSort(arr))

// 10、基数排序（桶排序的翻版）

/* 基数排序的排序思路是这样的：先以个位数的大小来对数据进行排序，接着以十位数的大小来多数进行排序，接着以百位数的大小…… 
    时间复杂度kn
*/

function radixSort(arr) {
    let maxArr = Array.from({length: 10}, x => [])
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    let num = 10
    for (;num <= max * 10; num *= 10) {
        for (let i = 0; i < arr.length; i++) {
            let curNum
            if (arr[i] >= num) {
                curNum = Math.floor(arr[i] % num) / (num / 10)
            } else {
                curNum = Math.floor(arr[i] / (num / 10))
            }
            maxArr[curNum].push(arr[i])
        }
        arr = [].concat(...maxArr)
        maxArr = Array.from({length: 10}, x => [])
    }
    return arr
}
// console.log(radixSort(arr))
// console.log(radixSort([10, 1, 2, 22, 50, 100, 120, 1000, 200]))
