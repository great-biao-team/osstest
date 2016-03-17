var ServerList = require('./../modelExt/extServerList');
var func = require('./func');

exports.getAll = function(req, res){
    ServerList.getAll(function(err, obj){
        res.json(obj);
    })
};