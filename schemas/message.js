var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    //关联回复
    answer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'answers'
    }],
    //用户名
    visitname: String,
    //用户
    visiter: String,
    //用户头像
    visiterImg: String,
    //留言时间
    leaveTime: {
        type: Date,
        default: new Date()
    },
    //内容
    content: {
        type: String,
        dafault: ''
    },
    //回复
    number: {
        type: Number,
        default: 0
    }
});