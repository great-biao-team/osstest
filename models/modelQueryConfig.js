var mongoose = (require('./mongodb')).mongoose;

//name ����
var queryConfigSchema = new mongoose.Schema({
    game_id : Number,
    menu_id : Number,
    server_related : Object,//Ԥ�����õ�һЩ���ݣ���������б������б�������и���ѡ��checkbox����Ĭ���Ƕ�ѡ�õ�selector
    query_id : Object //��QyeryItem���ҵ���Ӧ�Ĳ�ѯ���
});

exports.QueryConfig = mongoose.model('QueryConfig',queryConfigSchema);