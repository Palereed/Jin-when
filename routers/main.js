var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next){
   res.render('home/curtain');
})
//信笺模块
router.get('/home', function(req, res, next){
   res.render('home/home');
})
//信笺模块
router.get('/record', function(req, res, next){
   res.render('home/record');
})
//信笺模块
router.get('/message', function(req, res, next){
	res.render('home/message',{
     	visitInfo:req.visitInfo
     });
}) 
module.exports = router;