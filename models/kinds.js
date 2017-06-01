var mongoose = require('mongoose');
var kindSchema = require('../schemas/kind');
module.exports = mongoose.model('kinds' , kindSchema);