var extMysql = require('./../modelExt/extMysql');
var mysql = require('mysql');

exports.itemPrepare = function(req, res){

}

exports.useSql = function(req, res){
    extMysql.getOneByPlatformAndType(req.body.game_platform, req.body.type, function(err, conParams){
        var con = mysql.createConnection(conParams);
        con.query('SELECT 1', function(err, rows) {
            // connected! (unless `err` is set)
            res.json(rows);
        });
        con.end();
    });
};