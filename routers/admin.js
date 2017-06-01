var express = require('express');
var router = express.Router();
var Kind = require('../models/kinds');
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
//网站统计
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
//分类管理
router.get('/kindlist', function(req, res, next){
    var page = Number(req.query.page || 1);
    var limit = 5;
    Kind.count().then(function(count){
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;
        Kind.find().sort({_id:-1}).limit(limit).skip(skip).then(function(kinds){
            res.render('admin/kindlist',{
            visitInfo:req.visitInfo,
            kinds:kinds,
            page:page,
            pages:pages
           });
        })
   })
}) 
//分类添加
var kindData;
router.use(function(req, res, next){
    kindData = {
        code:0,
        message:''
    }
    next();
})
router.post('/kindlist', function(req, res, next){
    var title = req.body.title;
    if ( title == '' ){
      kindData.code = 1;
      kindData.message = '分类标题不能为空';
      res.json(kindData);
      return;
   }
   Kind.findOne({
      title:title
    }).then(function(kindInfo){
      if (kindInfo) {
         kindData.code = 2;
         kindData.message = '此分类已存在';
         res.json(kindData);
         return
      } 
      var kind = new Kind({
         title:title,
      })
      return  kind.save();
    }).then(function(){
      kindData.message = '添加成功';
      res.json(kindData);
   })
})
//分类修改
router.get('/kindlist/edit', function(req, res, next){
   var id = req.query.id || '';
   Kind.findOne({
     _id: id
   }).then(function(kind){
      res.render('admin/kindedit',{
            visitInfo:req.visitInfo,
            kind:kind
      })  
   })
})
var kindeditData;
router.use(function(req, res, next){
    kindeditData = {
        code:0,
        message:''
    } 
    next();
})
router.post('/kindlist/edit', function(req, res, next){
    var id = req.query.id || '';
    var title = req.body.title;
    Kind.findOne({
      _id:id
    }).then(function(){
      return Kind.update({
          _id:id
      },{
          title:title,
      })
    }).then(function(){
       kindeditData.message = '修改成功';
       res.json(kindeditData);
       return;
     })
})
//分类删除
router.get('/kindlist/delete', function(req, res, next){
   var id = req.query.id || '';
   Kind.findOne({
     _id: id
   }).then(function(kind){
      res.render('admin/kindelete',{
            visitInfo:req.visitInfo,
            kind:kind
      })  
   })
})
var kinddeleteData;
router.use(function(req, res, next){
    kinddeleteData = {
        code:0,
        message:''
    } 
    next();
})
router.post('/kindlist/delete', function(req, res, next){
    var id = req.query.id || '';
    Kind.findOne({
      _id:id
    }).then(function(){
       return Kind.remove({
          _id:id
       })
    }).then(function(){
       kinddeleteData.message = '删除成功';
       res.json(kinddeleteData);
       return;
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
//用户修改
router.get('/visiter/edit', function(req, res, next){
   var id = req.query.id || '';
   Visiter.findOne({
     _id: id
   }).then(function(visiter){
      res.render('admin/visiteredit',{
            visitInfo:req.visitInfo,
            visiter:visiter
      })  
   })
})
var visiterData;
router.use(function(req, res, next){
    visiterData = {
        code:0,
        message:''
    } 
    next();
})
router.post('/visiter/edit', function(req, res, next){
    var id = req.query.id || '';
    var visitmark = req.body.visitmark;
    var visitimg = req.body.visitimg;
    var visitname = req.body.visitname;
    var visitpass = req.body.visitpass;
    var visitsafe = req.body.visitsafe;
    Visiter.findOne({
      _id:id
    }).then(function(){
      return Visiter.update({
          _id:id
      },{
          visitmark:visitmark,
          visitimg:visitimg,
          visitname:visitname,
          visitpass:visitpass,
          visitsafe:visitsafe,
      })
    }).then(function(){
       visiterData.message = '修改成功';
       res.json(visiterData);
       return;
     })
})
//用户删除
router.get('/visiter/delete', function(req, res, next){
   var id = req.query.id || '';
   Visiter.findOne({
     _id: id
   }).then(function(visiter){
      res.render('admin/visiterdelete',{
            visitInfo:req.visitInfo,
            visiter:visiter
      })  
   })
})
var visiterdeleteData;
router.use(function(req, res, next){
    visiterdeleteData = {
        code:0,
        message:''
    } 
    next();
})
router.post('/visiter/delete', function(req, res, next){
    var id = req.query.id || '';
    Visiter.findOne({
      _id:id
    }).then(function(){
       return Visiter.remove({
          _id:id
       })
    }).then(function(){
       visiterdeleteData.message = '删除成功';
       res.json(visiterdeleteData);
       return;
     })
})


//文章发布
router.get('/article', function(req, res, next){
  Kind.find().then(function(kinds){
    res.render('admin/article',{
      visitInfo:req.visitInfo,
      kinds:kinds
      });
   })
}) 
var articleData;
router.use(function(req, res, next){
   //json传递数组是否只用一个就行?待项目完成后再进行尝试
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
//文章修改
router.get('/article/edit', function(req, res, next){
   var id = req.query.id || '';
   Article.findOne({
     _id: id
   }).then(function(article){
      res.render('admin/articledit',{
            visitInfo:req.visitInfo,
            article:article
      })  
   })
})
var editData;
router.use(function(req, res, next){
    editData = {
        code:0,
        message:''
    } 
    next();
})
router.post('/article/edit', function(req, res, next){
    var id = req.query.id || '';
    var title = req.body.title;
    var writer = req.body.writer;
    var lable = req.body.lable;
    var addInfo = req.body.addInfo;
    var copyInfo = req.body.copyInfo;
    var content = req.body.content;
    Article.findOne({
      _id:id
    }).then(function(){
      return Article.update({
          _id:id
      },{
          title:title,
          writer:writer,
          lable:lable,
          addInfo:addInfo,
          copyInfo:copyInfo,
          content:content
      })
      //为何用ajax不起作用？必须仔细研究研究
      //原因是传递了id参数admin/article/edit?id=...,但是ajax的url仅为admin/article/edit
      //含参url如何写?还是直接删除url?默认指向当前页,也就解决此问题
    }).then(function(){
       editData.message = '修改成功';
       res.json(editData);
       return;
     })
})
// 文章删除
router.get('/article/delete', function(req, res, next){
   var id = req.query.id || '';
   Article.findOne({
     _id: id
   }).then(function(article){
      res.render('admin/articledelete',{
            visitInfo:req.visitInfo,
            article:article
      })  
   })
})
var deleteData;
router.use(function(req, res, next){
    deleteData = {
        code:0,
        message:''
    } 
    next();
})
router.post('/article/delete', function(req, res, next){
    var id = req.query.id || '';
    Article.findOne({
      _id:id
    }).then(function(){
       return Article.remove({
          _id:id
       })
    }).then(function(){
       editData.message = '删除成功';
       res.json(editData);
       return;
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
//独白修改
router.get('/record/edit', function(req, res, next){
   var id = req.query.id || '';
   Record.findOne({
     _id: id
   }).then(function(record){
      res.render('admin/recordedit',{
            visitInfo:req.visitInfo,
            record:record
      })  
   })
})
var neweditData;
router.use(function(req, res, next){
    neweditData = {
        code:0,
        message:''
    } 
    next();
})
router.post('/record/edit', function(req, res, next){
    var id = req.query.id || '';
    var title = req.body.title;
    var mood = req.body.mood;
    var weather = req.body.weather;
    var content = req.body.content;
    Record.findOne({
      _id:id
    }).then(function(){
      return Record.update({
          _id:id
      },{
          title:title,
          mood:mood,
          weather:weather,
          content:content
      })
    }).then(function(){
       neweditData.message = '修改成功';
       res.json(neweditData);
       return;
     })
})
//独白删除
router.get('/record/delete', function(req, res, next){
   var id = req.query.id || '';
   Record.findOne({
     _id: id
   }).then(function(record){
      res.render('admin/recordelete',{
            visitInfo:req.visitInfo,
            record:record
      })  
   })
})
var newdeleteData;
router.use(function(req, res, next){
    newdeleteData = {
        code:0,
        message:''
    } 
    next();
})
router.post('/record/delete', function(req, res, next){
    var id = req.query.id || '';
    Record.findOne({
      _id:id
    }).then(function(){
       return Record.remove({
          _id:id
       })
    }).then(function(){
       newdeleteData.message = '删除成功';
       res.json(newdeleteData);
       return;
     })
})



//留言管理
router.get('/message', function(req, res, next){
	res.render('admin/message',{
     	visitInfo:req.visitInfo
     });
})   
module.exports = router;