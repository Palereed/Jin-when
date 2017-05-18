var express = require('express');
var router = express.Router();
var Visiter = require('../models/visiter');
//统一返回格式
var responseData;
router.use(function(req, res, next){
	responseData = {
		code:0,
		message:''
	}
	next();
})
//用户注册
router.post('/visiter/register', function(req, res, next){
   var visitname = req.body.visitname;
   var visitmark = req.body.visitmark;
   var visitpass = req.body.visitpass;
   var visitimg = req.body.visitimg;
   var visitsafe = req.body.visitsafe;
   //昵称不能为空
   if (visitname == ''){
   	 responseData.code = 1;
   	 responseData.message = '账户不能为空';
   	 //返回给前端
   	 res.json( responseData);
   	 return;
   } else if (visitmark == ''){
   	 responseData.code = 2;
   	 responseData.message = '昵称不能为空';
   	 res.json( responseData);
   	 return;
   }else if (visitpass == ''){
       responseData.code = 3;
       responseData.message = '密码不能为空';
       res.json( responseData);
       return;
   }else if (visitsafe == ''){
       responseData.code = 4;
       responseData.message = '密保不能为空';
       res.json( responseData);
       return;
   }
   //用户名是否已被注册
   Visiter.findOne({
      //prototype对象,可以直接.then,为啥？
      visitname:visitname
   }).then(function(visitInfo){
      if (visitInfo) {
         responseData.code = 5;
         responseData.message = '用户名已经被注册';
         res.json(responseData);
         return
      } 
      var visiter = new Visiter({
        visitname:visitname,
        visitmark:visitmark,
        visitpass:visitpass,
        visitimg :visitimg,
        visitsafe:visitsafe
      });
      return visiter.save();
   }).then(function(newVisiterInfo){
      responseData.message = '注册成功';
      res.json( responseData);
   })
})
//用户登陆
router.post('/visiter/land', function(req, res, next){
   var visitname = req.body.visitname;
   var visitpass = req.body.visitpass;
   if( visitname == '' || visitpass == ''){
     responseData.code = 1;
     responseData.message = '账户或密码不能为空';
     res.json(responseData);
     return;
   }
   // 查询数据库
   Visiter.findOne({
     visitname:visitname,
     visitpass:visitpass
   }).then(function (visitInfo){
      if (! visitInfo) {
         responseData.code = 2;
         responseData.message = '用户名或密码错误';
         res.json(responseData);
         return
      } 
      responseData.message = '登陆成功';
      responseData.visitInfo = {
         //此用户的昵称与头像
         visitname:visitInfo.visitname,
         visitmark:visitInfo.visitmark,
         visitimg:visitInfo.visitimg
      }
      //发送cookie
      req.cookies.set('visitInfo', JSON.stringify({
         visitname:visitInfo.visitname,
      }));
      res.json( responseData);
      return;
   })
})
module.exports = router;