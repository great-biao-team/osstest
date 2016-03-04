var model = require('./../models/modelRole');
var Role = model.Role;

exports.getAll = function(callback){
	Role.find(callback);
};

exports.getOneByRoleId = function(role_id, callback){
	Role.findOne({role_id: role_id}, callback);
};

exports.add = function(role_id, role_name, callback){
	var role = new Role();
	role.role_id = role_id;
	role.role_name = role_name;

	role.save(callback);
};

exports.updateByRoleId = function(role_id, option, callback){
	Role.findOneAndUpdate(
		{role_id: role_id},
		{$set: option},
		callback);
};

exports.deleteOneByRoleId = function(role_id, callback){
	Role.findOneAndRemove(
		{role_id: role_id},
		callback);
};
