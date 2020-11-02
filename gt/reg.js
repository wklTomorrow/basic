let str = new Date().toLocaleDateString()
let reg = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
str.replace(reg, function() {
    return RegExp.$1 + 'nian' + RegExp.$2 + 'yue' + RegExp.$3 + 'ri'
}) // "2020nian10yue22ri"