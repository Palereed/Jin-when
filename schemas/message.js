var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    //用户
    visiter:String,
    //用户头像
    visiterImg:String,
    //留言时间
    leaveTime:{
    	type:Date,
    	default:new Date()
    },
    //内容
    content:{
        type:String,
        dafault:''
    }
});