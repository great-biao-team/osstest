var model = require('./../models/modelServerList');
var ServerList = model.ServerList;

exports.getAll = function(callback){
    ServerList.find(callback);
};

exports.getOneByGameAndServer = function(game_platform, server_id, callback){
    ServerList.findOne({game_platform: game_platform,server_id: server_id}, callback);
};

exports.getSomeByGame = function(game_id, callback){
    ServerList.find({game_id: game_id}, callback);
};

exports.add = function(game_id, game_platform, server_id, server_name, type, ip,callback){
    var server = new ServerList();
    server.game_id = game_id;
    server.game_platform = game_platform;
    server.server_id = server_id;
    server.server_name = server_name;
    server.type = type;
    server.ip = ip;

    server.save(callback);
};

exports.updateByGameAndServer = function(game_platform, server_id, option, callback){
    ServerList.findOneAndUpdate(
        {game_platform: game_platform,server_id: server_id},
        {$set: option},
        callback);
};

exports.deleteOneByGameAndServer= function(game_id, Server_id, callback){
    ServerList.findOneAndRemove(
        {game_id: game_id, Server_id: Server_id},
        callback);
};
