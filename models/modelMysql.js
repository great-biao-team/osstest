var mongoose = (require('./mongodb')).mongoose;

//
var mysqlSchema = new mongoose.Schema({
    host : String, //Default: localhost
    user : String,
    charset : String,//default UTF8_GENERAL_CI
    password : String,
    database : String,
    port : Number ,//Default: 3306
    name : String
});

exports.Mysql = mongoose.model('Mysql',mysqlSchema);