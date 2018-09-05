var mongoose = require('mongoose');
var articleSchema = require('../schemas/message');
module.exports = mongoose.model('messages', articleSchema);