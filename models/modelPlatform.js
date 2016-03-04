var mongoose = (require('./mongodb')).mongoose;

//platform_id + game_id
//game_platform
var platformSchema = new mongoose.Schema({
	game_id : Number,
	platform_id : Number,
	game_platform : Number,
	platform_name : String
	//game_platform = 100000 * game_id + platform_id
});

exports.Platform = mongoose.model('Platform',platformSchema);