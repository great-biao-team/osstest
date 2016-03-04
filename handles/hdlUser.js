var User = require('./../modelExt/extUser');
var func = require('./func');
var hdlDefault = require('./hdlDefault');

exports.getAll = function(req, res, next){
	User.getAll(function(err, obj){
		if(err) 
			return next(err);
		//find 返回数组 若未找到则返回数组 []
		else if(obj.length == 0)
			return res.status(404).json(func.formJsonMsg(0,"Empty set : User"));

		else{
			return res.status(200).json(func.formJsonMsg(1, obj));
		}
	});
};

exports.getByName = function(req, res, next){
	User.getOneByName(req.params.name, function(err, obj){
		if(err)
			return next(err);
		//findOne 返回对象 未找到则返回null 
		else if(!obj)
			//用户数据涉及密码 得先去掉该字段
			return res.status(404).json(func.formJsonMsg(0,"User not found : " + req.params.name));
		else {
			var resultUser = {
				name : obj.name,
				email : obj.email,
				auth_url : obj.auth_url,
				role_id : obj.role_id
				};
			return res.status(200).json(func.formJsonMsg(1, new Array(resultUser)));			
		}
	});
};

exports.getSomeByRoleId = function(req, res, next){
	User.getSomeByRoleId(req.params.role_id, function(err, obj){
		if(err)
			return next(err);
		//findOne 返回对象 未找到则返回null
		else if(!obj || obj.length == 0)
		//用户数据涉及密码 得先去掉该字段
			return res.status(404).json(func.formJsonMsg(0,"User not found with role_id: " + req.params.role_id));
		else {
			var resultUser = obj.map(function(item){
				return{
					name : item.name,
					email : item.email,
					auth_url : item.auth_url,
					role_id : item.role_id
				}
			});
		}
			return res.status(200).json(func.formJsonMsg(1, resultUser));
	});
};

exports.add = function(req, res, next){
	if(!req.body.name || !req.body.password || !req.body.email)
		//412 （未满足前提条件） 服务器未满足请求者在请求中设置的其中一个前提条件。
		return res.status(412).json(func.formJsonMsg(0,"Require all params"));
	else{
		User.getOneByName(req.body.name, function(err, obj){
			if(err)
				 return next(err);
			else if(obj){
				//403 （禁止） 服务器拒绝请求。
				return res.status(403).json(func.formJsonMsg(0,"Record exists"));
			}
			else{
				if(!req.body.auth_url)
					req.body.auth_url = "";

				if(!req.body.role_id)
					req.body.role_id = 0;

				User.add(req.body.name,
					req.body.password,
					req.body.email,
					req.body.auth_url,
					req.body.role_id,
					function(err, obj){
					if(err)
						return next(err);
					return res.status(200).json(func.formJsonMsg(1, "Record add success"));
				});
			}
		});	
	}
};

exports.update = function(req, res, next){
	//禁止修改部分内容
	if(req.body.name)
		return res.status(403).json(func.formJsonMsg(0,"Invalid param : name"));
	else
		User.updateByName(
			req.params.name,
			req.body,
			function(err, obj){
				if(err)
					return next(err);
				if(!obj)
					return res.status(405).json(func.formJsonMsg(0, "Record not found"));				
				return res.status(200).json(func.formJsonMsg(1, "Record update success"));
			});
};

exports.del = function(req, res){
	User.deleteOneByName(req.params.name,
		function(err, obj){
			if(err)
				return next(err);
			else if(!obj)
				return res.status(405).json(func.formJsonMsg(0, "Record not found"));
			return res.status(200).json(func.formJsonMsg(1, "Record delete success"));
		});	
};

exports.checkUserPassword = function(req, res, next){
	console.log(req.body.name, req.body.password);
	User.getByNameAndPassword(req.body.name, req.body.password, function(err, obj){
		if(err || obj.length == 0){
			console.log("verify fail name:"+ req.body.name + " password:" + req.body.password);
			res.json(func.formJsonMsg(0,"用户名或密码错误"));
		}
		else{
			console.log("verify success name:"+ req.body.name + " password:" + req.body.password);
			res.json(func.formJsonMsg(1,"验证通过"));
			next();
;		}
	})	
};