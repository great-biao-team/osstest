var mongoose = (require('./mongodb')).mongoose;

//role_id 唯一
var roleSchema = new mongoose.Schema({
	role_id : Number,
	role_name : String,
	multiple_game : Boolean
});

exports.Role = mongoose.model('Role',roleSchema);