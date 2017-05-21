var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
	if (!req.visitInfo.isAdmin) {
         res.send('warning:请使用管理员身份登陆!');
         return
	}
	next();
})
//后台模块
router.get('/home', function(req, res, next){
	res.render('admin/home',{
     	visitInfo:req.visitInfo
     });
})   
//用户管理
router.get('/visiter', function(req, res, next){
	res.render('admin/visiter',{
     	visitInfo:req.visitInfo
     });
}) 
//文章发布
router.get('/article', function(req, res, next){
	res.render('admin/article',{
     	visitInfo:req.visitInfo
     });
}) 
//文章发布
router.get('/articlelist', function(req, res, next){
    res.render('admin/articlelist',{
        visitInfo:req.visitInfo
     });
})
//独白发布
router.get('/record', function(req, res, next){
	res.render('admin/record',{
     	visitInfo:req.visitInfo
     });
}) 
//独白列表
router.get('/recordlist', function(req, res, next){
    res.render('admin/recordlist',{
        visitInfo:req.visitInfo
     });
}) 
//留言管理
router.get('/message', function(req, res, next){
	res.render('admin/message',{
     	visitInfo:req.visitInfo
     });
})   
module.exports = router;