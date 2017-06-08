var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    message:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'messages'
    },
    //用户
    visiter:String,
    //用户头像
    visiterImg:String,
    //回复时间
    answerTime:{
    	type:Date,
    	default:new Date()
    },
    //内容
    content:{
        type:String,
        dafault:''
    },
});