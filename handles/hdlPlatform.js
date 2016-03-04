var Platform = require('./../modelExt/extPlatform');
var func = require('./func');

exports.getAll = function(req, res, next){
	Platform.getAll(function(err, obj){
		if(err) 
			return next(err);
		//find 返回数组 若未找到则返回数组 []
		else if(obj.length == 0)
			return res.status(404).json(func.formJsonMsg(0,"Empty set : Platform"));
		else
			return res.status(200).json(func.formJsonMsg(1, obj));
	});
};

exports.getByGamePlatform = function(req, res, next){
	Platform.getOneByGamePlatform(req.params.game_platform, function(err, obj){
		if(err)
			return next(err);
		else if(!obj)
			return res.status(404).json(func.formJsonMsg(0,"Platform not found : " + req.params.game_platform));
		else 
			return res.status(200).json(func.formJsonMsg(1, new Array(obj)));
	});
};

exports.add = function(req, res, next){
	if(!req.body.game_platform || !req.body.game_id
		|| !req.body.platform_id || !req.body.platform_name)
		//412 （未满足前提条件） 服务器未满足请求者在请求中设置的其中一个前提条件。
		return res.status(412).json(func.formJsonMsg(0,"Require all params"));
	else{
		Platform.getOneByGamePlatform(
			req.body.game_platform,
			function(err, obj){
			if(err)
				return next(err);
			else if(obj)
				//403 （禁止） 服务器拒绝请求。
				return res.status(403).json(func.formJsonMsg(0,"Record exists"));
			else{
				Platform.add(
					req.body.game_id,
					req.body.platform_id,
					req.body.game_platform,
					req.body.platform_name,					
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
	if(req.body.game_platform)
		return res.status(403).json(func.formJsonMsg(0,"Invalid param : game_platform"));
	else
		Platform.updateByGamePlatform(
			req.params.game_platform,
			req.body,
			function(err, obj){
				if(err){
					return next(err);
				}					
				else if(!obj)
					//405 请求行中指定的请求方法不能被用于请求相应的资源鉴于 PUT，DELETE 方法会对服务器上的资源进行写操作，
					//因而绝大部分的网页服务器都不支持或者在默认配置下不允许上述请求方法，对于此类请求均会返回405错误。
					return res.status(405).json(func.formJsonMsg(0, "Record not found"));
				return res.status(200).json(func.formJsonMsg(1, "Record update success"));
			});
};

exports.del = function(req, res, next){
	Platform.deleteOneByGamePlatform(
			req.params.game_platform,
		function(err, obj){
			if(err)
				return next(err);
			else if(!obj)
				return res.status(405).json(func.formJsonMsg(0, "Record not found"));
			else
				return res.status(200).json(func.formJsonMsg(1, "Record delete success"));
		}
	);
};
