var express = require('express');
var router = express.Router();
var Lable = require('../models/lables');
var Article = require('../models/articles');
var Record = require('../models/records');
var Message = require('../models/messages')
router.get('/', function(req, res, next){
   res.render('home/curtain');
})
//主页模块
router.get('/home', function(req, res, next){
    var data = {
        visitInfo:req.visitInfo,
        lables:[],
        //传过来的分类ID
        lableId:req.query.lableId || '',
        count:0,
        page:Number(req.query.page || 1),
        limit:5,
        pages:0
    }
    // 分类展示条件
    var where = {};
    if (data.lableId) {
        where.lableId = data.lableId
    }
    Lable.find().sort().then(function(lables){
        data.lables = lables;
        return Article.count(); 
    }).then(function(count){
        data.count = count;
        data.pages = Math.ceil( data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        var skip = (data.page - 1) * data.limit;
        return Article.where(where).find().sort({_id:-1}).limit(data.limit).skip(skip)
    }).then(function(articles){
        data.articles = articles;
        res.render('home/home',data);
    })
})
//文章展示模块
router.get('/home/read', function(req, res, next){
    var articleId = req.query.articleId || '';
    Article.findOne({
        _id:articleId
    }).then(function(article){
        //阅读数增加
        article.views++;
        article.save();
        res.render('home/read',{
        visitInfo:req.visitInfo,
        article:article
       });
    })
})


//独白模块
router.get('/record', function(req, res, next){
    Record.find().sort({_id:1}).then(function(records){
        res.render('home/record',{
        visitInfo:req.visitInfo,
        records:records,
       });
    })
})

//信笺模块
router.get('/message', function(req, res, next){
    var page = Number(req.query.page || 1);
    var limit = 8;
    //数据库中数据条数
    Message.count().then(function(count){
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;
        Message.find().sort({_id:-1}).limit(limit).skip(skip).then(function(messages){
            res.render('home/message',{
            visitInfo:req.visitInfo,
            messages:messages,
            page:page,
            pages:pages
           });
        })
    })
})
module.exports = router;