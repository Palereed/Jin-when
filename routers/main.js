var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next){
   res.render('curtain');
})
//信笺模块
router.get('/home', function(req, res, next){
   res.render('home');
})
//信笺模块
router.get('/record', function(req, res, next){
   res.render('record');
})
//信笺模块
router.get('/message', function(req, res, next){
   res.render('message',{
   	visitInfo:req.visitInfo
   });
})

module.exports = router;