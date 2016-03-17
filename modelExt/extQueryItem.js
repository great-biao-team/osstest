var model = require('./../models/modelQueryItem');
var QueryItem = model.QueryItem;

exports.getAll = function(callback){
    QueryItem.find(callback);
};

exports.getSomeBySqlIds = function(sql_ids, callback){
    QueryItem.find({sql_id: {'$in': sql_ids}}, callback);
};

exports.add = function(sql_id, text_name, sql_string, callback){
    var qItem = new QueryItem();

    qItem.sql_id = text_name;
    qItem.menu_id = menu_id;
    qItem.sql_string = sql_string;
    qItem.save(callback);
};

exports.updateBySqlId = function(sql_id,  callback){
    QueryItem.findOneAndUpdate(
        {sql_id: sql_id},
        {$set: option},
        callback);
};

exports.deleteOneBySqlId = function(sql_id, callback){
    QueryItem.findOneAndRemove({sql_id: sql_id},callback);
};