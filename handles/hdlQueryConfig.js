var QueryConfig = require('./../modelExt/extQueryConfig');
var FieldData = require('./../modelExt/extFieldData');
//以下全都是查询需要预先配置的下拉框选项
var ServerList = require('./../modelExt/extServerList');
var ChannelList = require('./../modelExt/extChannelList');
var QueryItem = require('./../modelExt/extQueryItem');

var async = require('async');
var func = require('./func');

exports.getAll = function(req, res, next){
    QueryConfig.getAll(function(err, obj){
        if(err)
            return next(err);
        //find 返回数组 若未找到则返回数组 []
        else if(obj.length == 0)
            return res.json(func.formJsonMsg(0,"Empty set : QueryConfig"));
        else
            return res.json(func.formJsonMsg(1, obj));
    });
};

exports.getInitDataByGameAndMenu = function(req, res, next){
    QueryConfig.getOneByGameAndMenu(req.params.game_id, req.params.menu_id, function(err, obj){
        if(err)
            return res.json(func.formJsonMsg(0,"Empty set : QueryConfig"));
        else{
            //obj.server_related处理
            console.log(obj);
            server_data = {};
            async.waterfall([
                function(callback){
                    if(obj.server_related.indexOf('serverList')>-1){
                        ServerList.getSomeByGame(req.params.game_id, function(err, a){
                            server_data['serverList'] = a;
                            callback(err, a);
                        });
                    }
                    else
                        callback(null, 1);
                },
                function(a, callback){
                    if(obj.server_related.indexOf('channelList') > -1){
                        ChannelList.getSomeByGame(req.params.game_id, function(err, a){
                            server_data['channelList'] = a;
                            callback(err, a);
                        });
                    }
                    else
                        callback(null, 1);
                },function(a, callback){
                    if(obj.query_id.length > 0){
                        QueryItem.getSomeBySqlIds(obj.query_id, function(err, a){
                            server_data['queryItem'] = a;
                            callback(err, a);
                        });
                    }
                    else
                        callback(null, 1);
                }
            ], function(err, result){
                console.log(server_data);
                res.json(func.formJsonMsg(1,server_data));
            });
        }
    });
};