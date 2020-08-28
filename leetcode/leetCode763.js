/* 
    划分字母区间
    尽可能多的划分区间
*/
 /**
  * 
  * @param {String} str 
  */
function getMax(str) {
    let res = []
    for (let i = 0; i < str.length;) {
        if (str.lastIndexOf(str[i]) === i) {
            res.push(1)
            i++
        } else {
            let maxIndex = str.lastIndexOf(str[i])
            for(let j = i+1; j < maxIndex; j++) {
                maxIndex = str.lastIndexOf(str[j]) > maxIndex ? str.lastIndexOf(str[j]) : maxIndex
            }
            res.push(maxIndex-i+1)
            i = maxIndex + 1
        }
    }
    return res
}
console.log(getMax('ababcbacadefegdehijhklij'))