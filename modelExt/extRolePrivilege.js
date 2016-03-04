var model = require('./../models/modelRolePrivilege');
var RolePrivilege = model.RolePrivilege;

exports.getAll = function(callback){
	RolePrivilege.find(callback);
};

exports.getSomeByRoleId = function(role_id, callback){
	RolePrivilege.find({role_id: role_id}, callback);
};

exports.getSomeByPrivilegeIds = function(privilege_ids, callback){
	RolePrivilege.find({privilege_id : {$in: privilege_ids}},
	callback);
};

exports.getOneByPrivilegeId = function(privilege_id, callback){
	RolePrivilege.find({privilege_id: privilege_id}, callback);
};

exports.getOne = function(role_id, privilege_id, callback){
	RolePrivilege.findOne(
		{role_id: role_id, privilege_id: privilege_id},
		callback);
};

exports.add = function(role_id, privilege_id, callback){
	var rp = new RolePrivilege();
	rp.role_id = role_id;
	rp.privilege_id = privilege_id;

	rp.save(callback);
};

exports.update = function(role_id, privilege_id, option, callback){
	RolePrivilege.findOneAndUpdate(
		{role_id: role_id, privilege_id: privilege_id},
		{$set: option},
		callback
	);
};

exports.deleteOne = function(role_id, privilege_id, callback){
	RolePrivilege.findOneAndRemove(
		{role_id: role_id, privilege_id: privilege_id},
		callback
	);
};

exports.deleteSomeByRoleId = function(role_id, callback){
	RolePrivilege.remove({role_id: role_id}, callback);
};

exports.deleteSomeByPrivilegeId = function(privilege_id, callback){
	RolePrivilege.remove({privilege_id: privilege_id}, callback);
};