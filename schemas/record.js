var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    //标题
    title: String,
    //发布时间
    addTime: {
        type: Date,
        default: new Date()
    },
    //心情
    mood: String,
    //天气
    weather: String,
    //内容
    content: String,
});