var mongoose = require('mongoose');
module.exports = new mongoose.Schma({
    //用户
    visiter:String,
    //留言时间
    leaveTime:{
    	type:Date,
    	default:new Date()
    },
    //内容
    content:String
    //留言回复
    anwer:{
    	type:Number,
    	default:new Date()
    }
});