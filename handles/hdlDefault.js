var Game = require('./../modelExt/extGame');
var Menu = require('./../modelExt/extMenu');
var Platform = require('./../modelExt/extPlatform');
var Privilege = require('./../modelExt/extPrivilege');
var Role = require('./../modelExt/extRole');
var RolePrivilege = require('./../modelExt/extRolePrivilege');
var User = require('./../modelExt/extUser');
var FieldData = require('./../modelExt/extFieldData');
var func = require('./func');

var async = require('async');

exports.toLoginPage = function(req, res){
	res.render('login');
};

exports.toHomePage = function(req, res){
    res.render("home");
};

exports.toGamePage = function(req, res){
    res.render("gamedata");
};

exports.toUserPage = function(req, res){
    var data = {myUser:[], otherUser:[], has_other: false};
    func.findUsersAndRolesByGameId(req.params.game_id, function(err, users){
        FieldData.addInfo(users, function(result){
            for(var u in result){
                if(result[u].multiple_game == false){
                    data.myUser.push(result[u]);
                }
                else{
                    data.otherUser.push(result[u]);
                    data.has_other = true;
                }
            }
            res.render('user',data);
        });
    });
};

exports.toRoleModifyPage = function(req, res){
    func.formPath(req.params.role_id, function(paths){
        for(var game in paths){
            for(var menu in paths[game]){

            }
        }
    })
};

exports.toBusinessPage = function(req, res){
    res.json(req.path);
};

exports.toRoleListPage = function(req, res){
    Role.getAll(function(err, obj){
        var roles = obj.map(function(r){
            return {
                role_id : r.role_id,
                role_name : r.role_name
            };
        });
        console.log(roles);
        res.render("rolelist",{rolelist: roles});
    });
};

exports.toTest = function(req, res){
    res.render("test");
};

exports.resetPrivileges = function(req, res){
    FieldData.completePrivilege(function(){

    });
    res.send();
};

exports.test = function(req, res){
    res.render("test");
};