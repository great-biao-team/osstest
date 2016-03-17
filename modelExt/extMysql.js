var model = require('./../models/modelMysql');
var Mysql = model.Mysql;

exports.getAll = function(callback){
    Mysql.find(callback);
};

exports.getOneByHostDb = function(host, database, callback){
    Mysql.findOne({host: host, database: database}, callback);
};

exports.getOneByName = function(name, callback){
    Mysql.findOne({name: name}, callback);
};

exports.getOneByPlatformAndType = function(game_platform, type){
    Mysql.findOne({game_platform: game_platform,type: type}, callback);
};

exports.add = function(host, user,charset, password, database, port, name,game_platform, type, callback){
    var mysql = new Mysql();
    mysql.host = host;
    mysql.user = user;
    mysql.database = database;
    mysql.name = name;

    mysql.charset = (charset ==null || charset == "") ?"UTF8_GENERAL_CI":charset;
    mysql.password = (password == null)? "":password;
    mysql.port = (port == null)? 3306:port;
    mysql.game_platform =(game_platform == null)? 0 : game_platform;
    mysql.type =(type == null || charset == "")? 0 : type;

    mysql.save(callback);
};

exports.updateByMysqlHostDb = function(host, database, option, callback){
    Mysql.findOneAndUpdate(
        {host: host, database: database},
        {$set: option},
        callback);
};

exports.deleteOneByMysqlHostDb = function(host, database, callback){
    Mysql.findOneAndRemove(
        {host: host, database: database},
        callback);
};
