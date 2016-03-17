var model = require('./../models/modelChannelList');
var ChannelList = model.ChannelList;

exports.getAll = function(callback){
    ChannelList.find(callback);
};

exports.getOneByGameAndChannel = function(game_id, channel_id, callback){
    ChannelList.findOne({game_id: game_id,channel_id: channel_id}, callback);
};

exports.getSomeByGame = function(game_id, callback){
    ChannelList.find({game_id: game_id}, callback);
};

exports.add = function(game_platform, channel_id,channel_name, callback){
    var channel = new ChannelList();
    channel.game_platform = game_platform;
    channel.channel_id = channel_id;
    channel.channel_name = channel_name;

    channel.save(callback);
};

exports.updateByGameAndChannel = function(game_id, channel_id, option, callback){
    ChannelList.findOneAndUpdate(
        {game_id: game_id,channel_id: channel_id},
        {$set: option},
        callback);
};

exports.deleteOneByGameAndChannel= function(game_id, channel_id, callback){
    ChannelList.findOneAndRemove(
        {game_id: game_id, channel_id: channel_id},
        callback);
};
