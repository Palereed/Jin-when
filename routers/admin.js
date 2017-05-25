var express = require('express');
var router = express.Router();
var Visiter = require('../models/visiter');
var Article = require('../models/articles');
var Record = require('../models/records')  
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
var articleData;
router.use(function(req, res, next){
    articleData = {
        code:0,
        message:''
    } 
    next();
})
router.post('/article', function(req, res, next){
    var title = req.body.title;
    var writer = req.body.writer;
    var lable = req.body.lable;
    var addInfo = req.body.addInfo;
    var copyInfo = req.body.copyInfo;
    var content = req.body.content;
    console.log(req.body);
    if (title == ''){
      articleData.code = 1;
      articleData.message = '文章标题不能为空';
      res.json(articleData);
      return;
   } else if (writer == ''){
      articleData.code = 2;
      articleData.message = '作者不能为空';
      res.json(articleData);
      return;
   }  else if ( addInfo == '转载' && copyInfo == ''){
      articleData.code = 3;
      articleData.message = '转载信息不能为空';
      res.json(articleData);
      return;
   } else if ( content == ''){
      articleData.code = 4;
      articleData.message = '内容不能为空';
      res.json(articleData);
      return;
   } 
   Article.findOne({
     title:title
    }).then(function(articleInfo){
      if (articleInfo) {
         articleData.code = 5;
         articleData.message = '此文章已存在';
         res.json(articleData);
         return
      } 
      var article = new Article({
         title:title,
         writer:writer,
         lable:lable,
         addInfo:addInfo,
         copyInfo:copyInfo,
         content:content
      })
      return  article.save();
    }).then(function(){
      articleData.message = '发布成功';
      res.json( articleData);
   })
}) 
//文章列表
router.get('/articlelist', function(req, res, next){
    var page = Number(req.query.page || 1);
    var limit = 8;
    Article.count().then(function(count){
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;
        Article.find().sort({_id:-1}).limit(limit).skip(skip).then(function(articles){
            res.render('admin/articlelist',{
            visitInfo:req.visitInfo,
            articles:articles,
            page:page,
            pages:pages
           });
        })
    })
})

//独白发布
router.get('/record', function(req, res, next){
	res.render('admin/record',{
     	visitInfo:req.visitInfo
     });
}) 
var recordData;
router.use(function(req, res, next){
    recordData = {
        code:0,
        message:''
    }
    next();
})
router.post('/record', function(req, res, next){
    var title = req.body.title;
    var mood = req.body.mood;
    var weather = req.body.weather;
    var content = req.body.content;
    console.log(req.body);
    if ( title == '' ){
      recordData.code = 1;
      recordData.message = '读白标题不能为空';
      res.json(recordData);
      return;
   } else if ( mood == '' ){
      recordData.code = 2;
      recordData.message = '心情不能为空';
      res.json(recordData);
      return;
   }  else if ( weather == '' ){
      recordData.code = 3;
      recordData.message = '天气不能为空';
      res.json(recordData);
      return;
   } else if ( content == '' ){
      recordData.code = 4;
      recordData.message = '内容不能为空';
      res.json(recordData);
      return;
   } 
   Record.findOne({
      title:title
    }).then(function(recordInfo){
      if (recordInfo) {
         recordData.code = 5;
         recordData.message = '此独白已存在';
         res.json(recordData);
         return
      } 
      var record = new Record({
         title:title,
         mood:mood,
         weather:weather,
         content:content
      })
      return  record.save();
    }).then(function(){
      recordData.message = '发布成功';
      res.json(recordData);
   })
})
//独白列表
router.get('/recordlist', function(req, res, next){
    var page = Number(req.query.page || 1);
    var limit = 8;
    Record.count().then(function(count){
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;
        Record.find().sort({_id:-1}).limit(limit).skip(skip).then(function(records){
            res.render('admin/recordlist',{
            visitInfo:req.visitInfo,
            records:records,
            page:page,
            pages:pages
           });
        })
    })
})

//留言管理
router.get('/message', function(req, res, next){
	res.render('admin/message',{
     	visitInfo:req.visitInfo
     });
})   
module.exports = router;