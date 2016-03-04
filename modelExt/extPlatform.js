var model = require('./../models/modelPlatform');
var Platform = model.Platform;

exports.getAll = function(callback){
	Platform.find(callback);
};

exports.getSomeByPlatformId = function(platform_id, callback){
	Platform.find({platform_id: platform_id}, callback);
};

exports.getSomeByGameId = function(game_id, callback){
	Platform.find({game_id: game_id}, callback);
};

exports.getOneByGamePlatform = function(game_platform, callback){
	Platform.findOne({game_platform: game_platform},
		callback);
};

exports.getOneByGameIdPlatformId = function(game_id, platform_id, callback){
	Platform.findOne({game_id: game_id,platform_id: platform_id},
		callback);
};

exports.add = function(game_id, platform_id, game_platform, platform_name, callback){
	var p = new Platform();
	p.game_id = game_id;
	p.platform_id = platform_id;
	p.game_platform = game_platform;
	p.platform_name = platform_name;

	p.save(callback);
};

exports.updateByGamePlatform = function(game_platform, option, callback){
	Platform.findOneAndUpdate(
		{game_platform: game_platform},
		{$set: option},
		callback);
};

exports.deleteOneByGamePlatform = function(game_platform, callback){
	Platform.findOneAndRemove(
		{game_platform: game_platform},
		callback);
};

exports.deleteSomeByGameId = function(game_id, callback){
	Platform.remove({game_id: game_id}, callback);
};