var mongoose = require('mongoose');
var answerSchema = require('../schemas/answer');
module.exports = mongoose.model('answers', answerSchema);