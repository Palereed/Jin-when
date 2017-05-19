// 调用express模块
var express = require('express');
// 调用模块处理模块
var swig = require('swig');
// 加载数据库
var mongoose= require('mongoose');
// 加载body-parser,用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 引入cookie模块
var Cookies = require('cookies');
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

// // req request 对象
// // res response对象
// // next 函数
// app.get('/', function(req, res, next){
//     // res.send('欢迎光临')
//     //读取view目录下的指定文件，解析并返回给客户端
//     //参数1：模板文件，相对于view目录
//     res.render('curtain');
// })
//bodyparser设置
//在api.js中 req.body 可以直接获得post后提交的数据
app.use(bodyParser.urlencoded({extended:true}));
//cookie设置
app.use(function(req, res, next){
    req.cookies = new Cookies(req, res);
    //解析登陆用户的cookie信息
    req.visitInfo = {}
    if(req.cookies.get('visitInfo')){
    	try{
            req.visitInfo = JSON.parse(req.cookies.get('visitInfo'));
        } catch (e){}
    }
    next();
})
//根据不同的功能划分模块
// app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main')) 

// 监听http请求
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27019/Jin-when', function(err){
	if(err){
        console.log('数据库连接失败');
	} else {
       console.log('数据库连接成功');
       app.listen(8080);
	}
});

