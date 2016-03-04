var model = require('./../models/modelMenu');
var Menu = model.Menu;

exports.getAll = function(callback){
	Menu.find(callback);
};

exports.getOneByMenuId = function(menu_id, callback){
	Menu.findOne({menu_id: menu_id}, callback);
};

exports.getSomeByMenuId = function(menu_ids, callback){
	Menu.find({'menu_id': {'$in': menu_ids}}, callback);
}

exports.add = function(menu_id, menu_title, menu_url, menu_level, parent_id, callback){
	var menu = new Menu();
	menu.menu_id = menu_id;
	menu.menu_title = menu_title;
	menu.menu_url = menu_url;
	menu.menu_level = menu_level;
	menu.parent_id = parent_id;

	menu.save(callback);
};

exports.updateByMenuId = function(menu_id, option, callback){
	Menu.findOneAndUpdate(
		{menu_id: menu_id},
		{$set: option},
		callback);
};

exports.deleteOneByMenuId = function(menu_id, callback){
	Menu.findOneAndRemove(
		{menu_id: menu_id},
		callback);
};

exports.getSomeByMenuLevel = function(menu_level, callback){
	Menu.find({menu_level: menu_level},
		callback);
};