var express = require('express');
var router = express.Router();
var Article = require('../models/articles');
var Record = require('../models/records')
router.get('/', function(req, res, next){
   res.render('home/curtain');
})
//主页模块
router.get('/home', function(req, res, next){
    var page = Number(req.query.page || 1);
    var limit = 5;
    Article.count().then(function(count){
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;
        Article.find().sort({_id:-1}).limit(limit).skip(skip).then(function(articles){
            res.render('home/home',{
            visitInfo:req.visitInfo,
            articles:articles,
            page:page,
            pages:pages
           });
        })
    })
})

//独白模块
router.get('/record', function(req, res, next){
    Record.find().sort({_id:-1}).then(function(records){
        res.render('home/record',{
        visitInfo:req.visitInfo,
        records:records,
       });
    })
})

//信笺模块
router.get('/message', function(req, res, next){
	res.render('home/message',{
     	visitInfo:req.visitInfo
     });
}) 
module.exports = router;