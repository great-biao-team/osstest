var model = require('./../models/modelQueryConfig');
var QueryConfig = model.QueryConfig;

exports.getAll = function(callback){
    QueryConfig.find(callback);
};

exports.getOneByGameAndMenu = function(game_id, menu_id, callback){
    QueryConfig.findOne({game_id: game_id, menu_id: menu_id}, callback);
};

exports.getSomeByGame = function(game_id, callback){
    QueryConfig.find({game_id: game_id}, callback);
};

exports.add = function(game_id, menu_id,server_related,query_id, callback){
    var qConfig = new QueryConfig();

    qConfig.game_id = game_id;
    qConfig.menu_id = menu_id;
    qConfig.server_related = server_related;
    qConfig.query_id = query_id;
    qConfig.save(callback);
};

exports.updateByGameAndMenu = function(game_id, menu_id, option, callback){
    QueryConfig.findOneAndUpdate(
        {game_id: game_id,menu_url: menu_id},
        {$set: option},
        callback);
};

exports.deleteOneByGameAndMenu = function(game_id, menu_id, callback){
    QueryConfig.findOneAndRemove(
        {game_id: game_id, menu_id: menu_id},
        callback);
};