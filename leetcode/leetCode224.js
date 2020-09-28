/* 
    基本计算器
    1+(1+1-1)-1
*/

const getNum = s => {
    let num = 0
    let stack = []
    let sign = 1
    s = s.replace(/\s/g, '')
    for (let i = 0; i < s.length; i++) {
        let n = s[i]
        if (!isNaN(n)) {
            let cur = parseInt(n)
            while ((i + 1) < s.length && !isNaN(s.charAt(i + 1))) {
                cur = cur * 10 + parseInt(s[i + 1])
                i++
            }
            num += sign * cur
        } else if (n === '-') {
            sign = -1
        } else if (n === '+') {
            sign = 1
        } else if (n === '(') {
            stack.push(num)
            num = 0
            stack.push(sign)
            sign = 1
        } else if (n === ')') {
            num = stack.pop() * num + stack.pop()
            sign = 1
        }
    }
    return num
}
getNum('1 + 1')
// var calculate = function(s) {
//     var len = s.length;
//     if(len === 0){
//         return 0;
//     }
//     var stack = [];
//     var res = 0;
//     var sign = 1;
//     for(var i=0;i<len;i++){
//         var n = s.charAt(i);
//         if (!isNaN(parseInt(n))){
//             var cur = parseInt(n);
//             while(i+1<len && (!isNaN(parseInt(s.charAt(i+1))))){
//                 cur = 10*cur + parseInt(s.charAt(++i));  
//             }
//             res += sign * cur;
//         } else if (n=="-"){
//             sign = -1;  
//         } else if (n=="+"){
//             sign = 1;  
//         } else if (n=="("){
//             stack.push(res);  
//             res = 0;  
//             stack.push(sign);  
//             sign = 1;
//         } else if (n==")"){
//             res = stack.pop() * res + stack.pop();  
//             sign = 1;
//         }
//     }
//     return res;
// };