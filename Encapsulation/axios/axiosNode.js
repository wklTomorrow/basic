const express = require('express')

let app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/getInfo', function(request, response){
    let data = {
        'username':'前端严选',
        'age':'2'
    };
    response.json(data);
});
app.listen(3000, function(){
    console.log("服务器启动");
});