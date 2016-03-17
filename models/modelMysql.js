var mongoose = (require('./mongodb')).mongoose;

//
var mysqlSchema = new mongoose.Schema({
    host : String, //Default: localhost
    user : String,
    charset : String,//default UTF8_GENERAL_CI
    password : String,
    database : String,
    port : Number ,//Default: 3306
    name : String,
    game_platform : Number,
    //每个平台可能需要访问多个ip，如前后端，数据机器等，
    // 初步分为"game_data"用于查询汇总数据
    // ,"server"用于查询线上数据
    type : String
});

exports.Mysql = mongoose.model('Mysql',mysqlSchema);