var extMysql = require('./../modelExt/extMysql');
var mysql = require('mysql');

exports.useSql = function(req, res){
    extMysql.getOneByHostDb(req.params.host, req.params.database, function(err, conParams){

        var con = mysql.createConnection(conParams);
        con.query('SELECT 1', function(err, rows) {
            // connected! (unless `err` is set)
            res.json(rows);
        });
        con.end();
    });
};