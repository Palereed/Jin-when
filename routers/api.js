var express = require('express');
var router = express.Router();

router.post('/visiter/register', function(req, res, next){
   console.log('register');
})

module.exports = router;