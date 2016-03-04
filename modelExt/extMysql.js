var model = require('./../models/modelMysql');
var Mysql = model.Mysql;

exports.getAll = function(callback){
    Mysql.find(callback);
};

exports.getOneByHostDb = function(host, database, callback){
    Mysql.findOne({host: host, database: database}, callback);
};

exports.getOneByName = function(name, callback){
    console.log("get one by name" + name);
    Mysql.findOne({name: name}, callback);
};

exports.add = function(host, user,charset, password, database, port, name, callback){
    var mysql = new Mysql();
    mysql.host = host;
    mysql.user = user;
    mysql.database = database;
    mysql.name = name;

    if(charset == null || charset == "")
        mysql.charset = "UTF8_GENERAL_CI";
    else
        mysql.charset = charset;

    if(password == null)
        mysql.password = "";
    else
        mysql.password = password;

    if(port == null)
        mysql.port = 3306;
    else
        mysql.port = port;

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
