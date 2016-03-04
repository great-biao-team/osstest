var mongoose = (require('./mongodb')).mongoose;

//game_id
var gameSchema = new mongoose.Schema({
	game_id : Number,
	game_name : String
});

exports.Game = mongoose.model('Game',gameSchema);