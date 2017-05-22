var express = require('express');
var router = express.Router();
var Visiter = require('../models/visiter') 
router.use(function(req, res, next){
	if (!req.visitInfo.isAdmin) {
         res.send('warning:请使用管理员身份登陆!');
         return
	}
	next();
})
//网站管理
router.get('/home', function(req, res, next){
    // 从数据库中读取管理者数据
    // 小bug,为何使用'isAdmin':'true'查询为空？
    Visiter.find({"isAdmin":{$ne:false}}).then(function(visiters){
        res.render('admin/home',{
        visitInfo:req.visitInfo,
        visiters:visiters
     });
   })
})   
//用户管理
router.get('/visiter', function(req, res, next){
    // 读取数据条数      跳过数据条数
    // limit(Number)     skip(Number)
    var page = Number(req.query.page || 1);
    var limit = 8;
    //数据库中数据条数
    Visiter.count({"isAdmin":"false"}).then(function(count){
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过总页数
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;
        //从数据库中读取非管理者数据
        //sort 1升序,-1降序
        Visiter.find({"isAdmin":"false"}).sort({_id:-1}).limit(limit).skip(skip).then(function(visiters){
            res.render('admin/visiter',{
            visitInfo:req.visitInfo,
            visiters:visiters,
            page:page,
            pages:pages
           });
        })
    })
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