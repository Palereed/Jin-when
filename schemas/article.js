//表结构对象
var mongoose= require('mongoose');
module.exports = new mongoose.Schema({
    //标题
    title:String,
    //作者
    writer:String,
    //标签
    lable:String,
    //备注
    addInfo:String,
    //转载信息
    copyInfo:String,
    //内容
    content:String
});