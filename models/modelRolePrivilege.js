var mongoose = (require('./mongodb')).mongoose;

//role_id + privilege_id 唯一
var rolePrivilegeSchema = new mongoose.Schema({
	role_id : Number,
	privilege_id : Number
});

exports.RolePrivilege = mongoose.model('RolePrivilege',rolePrivilegeSchema);