// 调用express模块
var express = require('express');
// 调用模块处理模块
var swig = require('swig');
// 创建app应用(即是NodeJs Http.createServer();)
var app = express();
//设置静态文件托管
//当用户访问的url以/public开始，那么返回__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));
// 配置应用模板
// 定义当前应用的模板引擎
// 参数1：模板引擎名称，同时也是模板文件后缀。参数2：解析处理模板应用的方法
app.engine('html', swig.renderFile);
// 设置模板存放目录
// 参数1：views。参数2：目录 
app.set('views', './views');
// 注册模板引擎      
// 参数1：view engine。参数2：app.engine第一个参数一致。 
app.set('view engine', 'html');
// 首页
// req request 对象
// res response对象
// next 函数
app.get('/', function(req, res, next){
    // res.send('欢迎光临')
    //读取view目录下的指定文件，解析并返回给客户端
    //参数1：模板文件，相对于view目录
    res.render('curtain')
})
// 监听http请求
app.listen(8080);
