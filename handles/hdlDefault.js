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

exports.toGamePage = function(req, res){
    var data = {menu_list:[], game_list:[]};

    //session失效后会有server error
    for(var key in req.session.availablePath[req.params.game_id]){
        data.menu_list.push({menu_id: key});
    }

    for(var key in req.session.availablePath){
        if(req.params.game_id == key)
            data.game_list.push({game_id: key,selected:"selected"});
        else
            data.game_list.push({game_id: key});
    }

    FieldData.addInfo(data.menu_list, function(result){
        data.menu_list = result.map(function(item){
            return {
                menu_id : item.menu_id,
                menu_title : item.menu_title,
                menu_url : item.menu_url + "/" + req.params.game_id
            };
        });
    });

    FieldData.addInfo(data.game_list, function(result){
        data.game_list = result;
    });

    res.render("gameDetail",data);
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