var mongoose = (require('./mongodb')).mongoose;
var crypto = require('crypto');

//name 主键
var userSchema = new mongoose.Schema({
	name : String,
	password : String,
	email : String,
	auth_url : String,
	role_id : Number
});

exports.User = mongoose.model('User',userSchema);