var mongoose = (require('./mongodb')).mongoose;

//name 主键
var queryConfigSchema = new mongoose.Schema({
    game_id : Number,
    menu_id : Number,
    server_related : Object,//预加载用的一些数据，如服务器列表，渠道列表，最好能有个复选的checkbox。先默认是多选用的selector
    query_id : Object //到QyeryItem中找到对应的查询语句
});

exports.QueryConfig = mongoose.model('QueryConfig',queryConfigSchema);