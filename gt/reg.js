let str = new Date().toLocaleDateString()
let reg = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
str.replace(reg, function() {
    return RegExp.$1 + 'nian' + RegExp.$2 + 'yue' + RegExp.$3 + 'ri'
}) // "2020nian10yue22ri"


function dateFormat(timestamp, format) {
    if (!format) {
        format = "YYYY-MM-dd hh:mm:ss";
    }
    timestamp = parseInt(timestamp);
    let timer = new Date(timestamp)
    var date = {
        'Y': timer.getFullYear(),
        'M': timer.getMonth() + 1,
        'd': timer.getDate(),
        'h': timer.getHours(),
        'm': timer.getMinutes(),
        's': timer.getSeconds()
    }
    let newString = format
    format.replace(/(Y|M|d|h|m|s)+/g, function(...index) {
        newString = newString.replace(index[0], date[index[1]])
    })
    return newString;
}

console.log(dateFormat(new Date().getTime()))