var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.2.1:27017/nodejs');

exports.mongoose = mongoose;
//后续把所有model整理到一个文件中