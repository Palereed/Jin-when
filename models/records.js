var mongoose = require('mongoose');
var articleSchema = require('../schemas/record');
module.exports = mongoose.model('records' , articleSchema);