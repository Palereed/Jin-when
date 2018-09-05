var mongoose = require('mongoose');
var kindSchema = require('../schemas/lable');
module.exports = mongoose.model('lables', kindSchema);