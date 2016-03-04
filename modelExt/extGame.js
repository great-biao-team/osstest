var model = require('./../models/modelGame');
var Game = model.Game;

exports.getAll = function(callback){
	Game.find(callback);
};

exports.getOneByGameId = function(game_id, callback){
	Game.findOne({game_id: game_id}, callback);
};

exports.getSomeByGameId = function(game_ids, callback){
	Game.find({'game_id': {'$in': game_ids}}, callback);
};

exports.add = function(game_id, game_name, callback){
	var game = new Game();
	game.game_id = game_id;
	game.game_name = game_name;

	game.save(callback);
};

exports.updateByGameId = function(game_id, option, callback){
	Game.findOneAndUpdate(
		{game_id: game_id},
		{$set: option},
		callback);
};

exports.deleteOneByGameId = function(game_id, callback){
	Game.findOneAndRemove(
		{game_id: game_id},
		callback);
};
