let http = require('http');

// let util = require("util");

http.get('https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
(res)=>{
　　let data = "";
    res.on("data",(chunk)=>{
　　　　data += chunk;
　　});

    res.on("end",()=>{
　　　　let result = JSON.parse(data);
console.log(result)
// 　　　　console.log("result:"+util.inspect(result));  //调试打印信息 输出的信息： result:{result:-11,data:'',msg:'没有登录'}
　　})

　　res.on("error",(e)=>{
　　　　console.log(`错误:${e.message}`)
　　})

})