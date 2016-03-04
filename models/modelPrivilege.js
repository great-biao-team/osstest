var mongoose = (require('./mongodb')).mongoose;

//privilege_id 唯一
var privilegeSchema = new mongoose.Schema({
	privilege_id : Number,
	privilege_title : String,
	game_platform : Number,
	menu_id : Number
});

exports.Privilege = mongoose.model('Privilege',privilegeSchema);