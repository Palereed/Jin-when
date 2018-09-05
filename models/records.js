var mongoose = require('mongoose');
var recordSchema = require('../schemas/record');
module.exports = mongoose.model('records', recordSchema);