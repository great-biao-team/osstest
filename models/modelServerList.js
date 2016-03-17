var mongoose = (require('./mongodb')).mongoose;

//name ����
var serverListSchema = new mongoose.Schema({
    game_id : Number,
    game_platform: Number,
    server_id: Number,
    server_name: String,
    type: String,//type ����ʽ�������Է���������ȵ�
    ip: String//������ӵ�����
});

exports.ServerList = mongoose.model('ServerList',serverListSchema);