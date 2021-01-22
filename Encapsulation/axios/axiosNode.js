const express = require('express')
var cookieParser = require('cookie-parser'); //引用中间件
// let app = express(cookieParser());
let app = express();

app.all('*', function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*'); // 第三方不允许使用cookie等header内容
    // res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5000');
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    // res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header('Access-Control-Allow-Headers', 'token,Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/getInfo', function(request, response){
    let data = {
        'username':'前端严选',
        'age':'2'
    };
    // response.cookie("username",'wang',{maxAge:60000}); //设置cookie和过期时间
    response.setHeader('Set-Cookie', ['username=wang; Path=/;']);
    // response.setHeader('Set-Cookie', ['username=wang; Max-Age=60; Path=/; Expires=Wed, 23 Dec 2020 07:57:55 GMT']);
    response.json(data);
});
app.listen(3000, function(){
    console.log("服务器启动");
});