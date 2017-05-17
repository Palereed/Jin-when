//表结构对象
var mongoose= require('mongoose');
module.exports = new mongoose.Schema({
    //账户
    visitname:String,
    //昵称
    visitmark:String,
    //密码
    visitpass:String,
    //密保
    visitsafe:String
});

