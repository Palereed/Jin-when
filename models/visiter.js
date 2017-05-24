//通过表结构对象模型类创建
var mongoose = require('mongoose');
var visitSchema = require('../schemas/visit');
module.exports = mongoose.model('visiter' , visitSchema);