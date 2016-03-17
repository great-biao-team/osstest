var mongoose = (require('./mongodb')).mongoose;

//name Ö÷¼ü
var queryItemSchema = new mongoose.Schema({
    sql_id : Number,
    text_name : String,
    sql_string : String
});

exports.QueryItem = mongoose.model('QueryItem',queryItemSchema);