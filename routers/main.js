var express = require('express');
var router = express.Router();
var Kind = require('../models/kinds');
var Article = require('../models/articles');
var Record = require('../models/records')
router.get('/', function(req, res, next){
   res.render('home/curtain');
})
//主页模块
router.get('/home', function(req, res, next){
    var data = {
        visitInfo:req.visitInfo,
        kinds:[],
        //传过来的分类ID
        kindId:req.query.kindId || '',
        count:0,
        page:Number(req.query.page || 1),
        limit:5,
        pages:0
    }
    // 分类展示条件
    var where = {};
    if (data.kindId) {
        where.kindId = data.kindId
    }
    Kind.find().sort().then(function(kinds){
        data.kinds = kinds;
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
	res.render('home/message',{
     	visitInfo:req.visitInfo
     });
}) 
module.exports = router;