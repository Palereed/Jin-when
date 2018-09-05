//表结构对象
var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    //标题
    title: String,
    //发布时间
    addTime: {
        type: Date,
        default: new Date()
    },
    //文章数
    number: {
        type: Number,
        default: 0
    }
});