var model = require('./../models/modelPrivilege');
var Privilege = model.Privilege;

exports.getAll = function(callback){
	Privilege.find(callback);
};

exports.getOneByPrivilegeId = function(privilege_id, callback){
	Privilege.findOne({privilege_id: privilege_id},
		callback);
};

exports.getSomeByPrivilegeIds = function(privilege_ids, callback){
	Privilege.find({privilege_id: {$in: privilege_ids}},
		callback);
};

exports.getSomeByGameId = function(game_id, callback){
	var min_id = parseInt(game_id) * 100000;
	var max_id = (parseInt(game_id) + 1) * 100000;
	Privilege.find({game_platform: {$gte: min_id,$lt: max_id}},
	callback);
};

exports.getSomeByGamePlatform = function(game_platform, callback){
	Privilege.find({game_platform: game_platform},
		callback);
};

exports.add = function(privilege_id, privilege_title, game_platform,  menu_id, callback){
	var pr = new Privilege();

	pr.privilege_id = privilege_id;
	pr.privilege_title = privilege_title;
	pr.game_platform = game_platform;
	pr.menu_id = menu_id;

	pr.save(callback);
};

exports.updateByPrivilegeId = function(privilege_id, option, callback){
	Privilege.findOneAndUpdate(
		{privilege_id: privilege_id}, 
		{$set: option},
		callback);
};

exports.deleteOneByPrivilegeId = function(privilege_id, callback){
	Privilege.findOneAndRemove(
		{privilege_id: privilege_id},
		callback);
};

exports.deleteSomeByGamePlatform = function(game_platform, callback){
	Privilege.remove(
		{game_platform: game_platform},
		callback);
};

exports.deleteAllPrivilege = function(callback) {
	Privilege.remove(callback);
};