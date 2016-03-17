var mongoose = (require('./mongodb')).mongoose;

//name 主键
var serverListSchema = new mongoose.Schema({
    game_id : Number,
    game_platform: Number,
    server_id: Number,
    server_name: String,
    type: String,//type 如正式服，测试服，提审服等等
    ip: String//可以添加的数据
});

exports.ServerList = mongoose.model('ServerList',serverListSchema);