var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next){
   res.render('curtain',{
   	visitInfo:req.visitInfo
   });
})
module.exports = router;