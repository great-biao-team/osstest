var mongoose = (require('./mongodb')).mongoose;

//menu_id
var menuSchema = new mongoose.Schema({
        menu_id : Number,
        menu_title : String,
        menu_url : String,
        menu_level : Number,
        parent_id : Number,
        need_auth : Boolean
});

exports.Menu = mongoose.model('Menu',menuSchema);