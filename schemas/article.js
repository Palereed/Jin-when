//表结构对象
var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    //标题
    title:String,
    //作者
    writer:String,
    //发布时间
    addTime:{
        type:Date,
        default:new Date()
    },
    //标签
    lable:String,
    //分类
    lableId:String,
    //备注
    addInfo:String,
    //转载信息
    copyInfo:String,
    //内容
    content:String,
    //阅读量
    views:{
        type:Number,
        default:0
    },
    //评论,条数很多,使用空数组存储
    comments:{
        type:Array,
        default:[]
   }
});