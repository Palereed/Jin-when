// 调用express模块
var express = require('express');
// 调用模块处理模块
var swig = require('swig');
// 加载数据库
var mongoose = require('mongoose');
// 加载body-parser,用来处理post提交过来的数据
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var Visiter = require('./models/visiter');
var app = express();
//设置静态文件托管
app.use('/public', express.static('public'));
// 配置应用模板
// swig引擎处理html文件
app.engine('html', swig.renderFile);
// 放模板文件的目录 
app.set('views', './views');
// 注册模板引擎      
app.set('view engine', 'html');
//bodyparser设置
//在api.js中 req.body 可以直接获得post后提交的数据
app.use(bodyParser.urlencoded({
    extended: true
}));
//cookie设置
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    //解析登陆用户的cookie信息
    req.visitInfo = {}
    if (req.cookies.get('visitInfo')) {
        try {
            req.visitInfo = JSON.parse(req.cookies.get('visitInfo'));
            //获取当前访问者权限
            Visiter.findOne({
                visitname: req.visitInfo.visitname
            }).then(function (visitInfo) {
                req.visitInfo.isAdmin = Boolean(visitInfo.isAdmin);
                //next()放置位置太重要了,浪费了1个多小时。
                next();
            });
        } catch (e) {
            next();
        }
    } else {
        next();
    }
})
//加载路由模块
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))

// 监听http请求
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27018/Jin-when', function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(9000);
    }
});