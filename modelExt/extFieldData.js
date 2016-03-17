var Game = require('./extGame');
var Menu = require('./extMenu');
var Platform = require('./extPlatform');
var Role = require('./extRole');
var ServerList = require('./extServerList');
var ChannelList = require('./extChannelList');

var async = require('async');

fieldData = {};
exports.init = function(){
    async.waterfall([
            function(callback){
                var data = {};
                Game.getAll(function(err, obj){
                    if(err)
                        return callback(err, null);
                    data.games = obj;
                    callback(null, data)
                });
            },

            function(data, callback){
                Menu.getAll(function(err, obj){
                    if(err)
                        return callback(err, null);
                    data.menus = obj;
                    callback(null, data);
                });
            },

            function(data, callback){
                Platform.getAll(function(err, obj){
                    if(err)
                        return callback(err, null);
                    data.platforms = obj;
                    callback(null, data);
                });
            },

            function(data, callback){
                Role.getAll(function(err, obj){
                    if(err)
                        return callback(err, null);
                    data.roles = obj;
                    callback(null, data);
                });
            },

            function(data, callback){
                ServerList.getAll(function(err, obj){
                    if(err)
                        return callback(err, null);
                    data.serverlist = obj;
                    callback(null, data);
                });
            },

            function(data, callback){
                ChannelList.getAll(function(err, obj){
                    if(err)
                        return callback(err, null);
                    data.channellist = obj;
                    callback(null, data);
                });
            }
        ],function(err, result){
            if(err)
                fieldData = {};
            else{
                fieldData = result;
            }
        }
    );
};

//��֯������Ȩ��
exports.completePrivilege = function(callback){
    var privileges = [];
    for(var i in fieldData.menus){
        if(fieldData.menus[i].need_auth == true)
            for(var j in fieldData.games){
                for(var k in fieldData.platforms){
                    if(fieldData.games[j].game_id == fieldData.platforms[k].game_id)
                        privileges.push({
                            privilege_id: fieldData.menus[i].menu_id
                            + "-" + fieldData.games[j].game_id
                            + "-" + fieldData.platforms[k].platform_id,

                            privilege_title: fieldData.menus[i].menu_title
                            + "-" + fieldData.games[j].game_name
                            + "-" + fieldData.platforms[k].platform_name,

                            game_platform : fieldData.platforms[j].game_platform,

                            menu_id : fieldData.menus[i].menu_id
                        });
                }
            }
    }
};

//�����У���������ַ���
exports.addInfo = function(data, callback){
    async.map(data, function(item, callback){
            if(item.game_id && !item.game_name)
                for(var i= 0; i<fieldData.games.length; i++)
                    if(item.game_id == fieldData.games[i].game_id){
                        item.game_name = fieldData.games[i].game_name;
                        break;
                    }
            if(item.menu_id && !item.menu_title)
                for(var i= 0; i<fieldData.menus.length; i++)
                    if(item.menu_id == fieldData.menus[i].menu_id){
                        item.menu_title = fieldData.menus[i].menu_title;
                        item.menu_url = fieldData.menus[i].menu_url;
                        break;
                    }
            if(item.game_platform && !item.platform_name)
                for(var i= 0; i<fieldData.platforms.length; i++)
                    if(item.game_platform == fieldData.platforms[i].game_platform){
                        item.platform_name = fieldData.platforms[i].platform_name;
                        break;
                    }
            if(item.role_id && !item.role_name)
                for(var i= 0; i<fieldData.roles.length; i++)
                    if(item.role_id == fieldData.roles[i].role_id){
                        item.role_name = fieldData.roles[i].role_name;
                        item.multiple_game = fieldData.roles[i].multiple_game;
                        break;
                    }
            callback(null, item);
        }, function(err, result){
            if(err)
                callback(err, null);
            callback(result);
        }
    );
};

exports.getData = function(str, callback){
    if(fieldData.hasOwnProperty(str)){
        console.log(fieldData[str]);
        callback(fieldData[str]);
    }
    else
        callback(null);
};