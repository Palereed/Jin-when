var mongoose = require('mongoose');
var articleSchema = require('../schemas/article');
module.exports = mongoose.model('articles', articleSchema);