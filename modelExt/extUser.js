var model = require('./../models/modelUser');
var User = model.User;
var crypto = require('crypto');

//查看全部用户
exports.getAll = function(callback){
	//过滤字段password和_id
	User.find({}, {password: 0, _id: 0}, callback);
};

//根据名字查看单个
exports.getOneByName = function(name, callback){
	User.findOne({name: name}, callback);
};

//根据role_id查看多个
exports.getSomeByRoleIds = function(role_ids, callback){
	User.find({role_id: {$in: role_ids}},
		{password: 0},
		callback);
};

//根据role_id查看多个
exports.getSomeByRoleId = function(role_id, callback){
	User.find({role_id: role_id}, callback);
};

exports.getByNameAndPassword = function(name, password, callback){
	var passwordMd5 =md5Security(password);
	User.find({name: name, password: passwordMd5}, 
		callback
		);
};

exports.updateByName = function(name, option, callback){
	if(option.password)
		option.password = md5Security(option.password);

	User.findOneAndUpdate(
		{name: name},
		{$set: option},
		callback
	);
};

//增加
exports.add = function(name, password, email, auth_url, role_id, callback){

	var user = new User();
	user.name = name;
	user.password = md5Security(password);
	user.email = email;
	user.auth_url = (!auth_url)? "":auth_url;
	user.role_id = (!role_id)? 0:role_id;
	
	user.save(callback);
};

exports.deleteOneByName = function(name, callback){
	User.findOneAndRemove({name: name},
		callback);
};

exports.deleteSomeByNames = function(name, callback){
	User.remove({'name' : {'$in': names}}, callback);
};

exports.deleteSomeByRoleId = function(role_id, callback){
	User.remove({role_id: role_id}, callback);
};

var md5Security = function(str){
	var md5 = crypto.createHash('md5');
	md5.update(str);
	return md5.digest('hex');
};