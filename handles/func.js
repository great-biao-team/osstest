var Game = require('./../modelExt/extGame');
var Menu = require('./../modelExt/extMenu');
var Platform = require('./../modelExt/extPlatform');
var Privilege = require('./../modelExt/extPrivilege');
var Role = require('./../modelExt/extRole');
var RolePrivilege = require('./../modelExt/extRolePrivilege');
var User = require('./../modelExt/extUser');

var async = require('async');
exports.formJsonMsg = function(flag, data){
	return {flag : flag, info : data};
};

exports.formPath = function(role_id, callback){
	async.waterfall([
			function(callback) {
				//role_id -> privilege_id
				RolePrivilege.getSomeByRoleId(role_id, function(err, obj){
					if(err)
						return callback(err, null);

					if(!obj)
						return callback(new Error("Not found :role_id"+role_id), null);

					privilege_ids = obj.map(function(a){
						return a.privilege_id;
					});
					callback(err, privilege_ids);
				});
			},

			//privilege_id -> menu_id + game_platform
			function(privilege_ids, callback) {

				Privilege.getSomeByPrivilegeIds(privilege_ids, function(err, obj){
					if(err)
						return callback(err, null);

					if(obj.length == 0)
						return callback(new Error("Not found :privilege_ids" + privilege_ids), null);

					menus = obj.map(function(a){
						return{
							game_platform: a.game_platform,
							menu_id: a.menu_id,
							game_id: Math.floor(a.game_platform/100000)
						}
					});
					callback(err, menus);
				});
			},

			//reorgnize
			function(data, callback){
				//var data = [{"game_platform":100000,"menu_id":1},{"game_platform":200001,"menu_id":2}
				//,{"game_platform":200002,"menu_id":2},{"game_platform":300001,"menu_id":1}
				//,{"game_platform":300002,"menu_id":1}];
				//result = { '1': { '1': [ 100000 ] },
				//            '2': { '2': [ 200001, 200002 ] },
				//            '3': { '1': [ 300001, 300002 ] } }
				var result = {};

				async.reduce(data, result, function(memo, item, callback){
					var game_id = Math.floor(item.game_id);

					if(memo[game_id] == null)
						memo[game_id] = {};

					if(memo[game_id][item.menu_id] == null)
						memo[game_id][item.menu_id] = [];

					memo[game_id][item.menu_id].push(item.game_platform);

					callback(null,memo);
				}, function(err, result){
					callback(null, result);
				});
			}
		],

		//end with game_platform + menu_id + game_id
		function(err,result) {
			if(err)
				callback(err, new Array());
			else{
				callback(err, result);
			}
		}
	);
};

exports.findUsersAndRolesByGameId = function(game_id, callback){
	async.waterfall([
			function(callback) {
				//game_id -> privilege_id
				Privilege.getSomeByGameId(game_id, function(err, obj){
					if(err)
						return callback(err, null);

					if(!obj)
						return callback(new Error("Not found :game_id"+game_id), null);

					privilege_ids = obj.map(function(a){
						return a.privilege_id;
					});

					callback(err, privilege_ids);
				});
			},

			//privilege_ids -> roles
			function(privilege_ids, callback) {

				RolePrivilege.getSomeByPrivilegeIds(privilege_ids, function(err, obj){
					if(err)
						return callback(err, null);

					if(obj.length == 0)
						return callback(new Error("Not found :privilege_ids" + privilege_ids), null);

					role_ids = obj.map(function(a){
						return a.role_id;
					});

					callback(err, role_ids);
				});
			},

			//role_ids -> users
			function(role_ids, callback) {

				User.getSomeByRoleIds(role_ids, function(err, obj){
					if(err)
						return callback(err, null);

					if(obj.length == 0)
						return callback(new Error("Not found :role_ids" + role_ids), null);

					users = obj.map(function(a){
						return{
							name: a.name,
							role_id: a.role_id
						}
					});
					callback(err, users);
				});
			}
		],

		//end with users
		function(err, users) {
			if(err)
				callback(err, new Array());
			else{
				callback(err, users);
			}
		}
	);
};