var hdlDefault = require('./hdlDefault');
var func = require('./func');
var User = require('./../modelExt/extUser');
var FieldData = require('./../modelExt/extFieldData');

//登录成功，重置session
exports.init = function(req, res){
    req.session.user = req.body.name;

    User.getOneByName(req.body.name, function (err, obj) {
        if (err){
            console.log(err);
        }
        else if (!obj || obj.role_id == null){
            console.log(new Error("Not found :name" + req.body.name));
        }
        else
            func.formPath(obj.role_id, function (err, obj) {
                if (err)
                    console.log(err);
                else{
                    req.session.availablePath = obj;
                    req.session.save();
                }
            });
    });
};

//销毁
exports.destroy = function(req, res, next){
    req.session.destroy(function(err){
        hdlDefault.toLoginPage(req, res);
    });
};

//session是否有效
exports.validSession = function(req, res, next){
    console.log("user:"+req.session.user);
    if(req.session.user) {
        var is_pass = false;
        var arr = req.path.split("/");
        console.log(arr);
        if(arr[1] == "home")
            next();
    }
    else
    {
        hdlDefault.toLoginPage(req, res);
    }

};

//session 数据
exports.gamelist = function(req, res){
    var games = [];
    for(var key in req.session.availablePath){
        if(!games.some(function(item){
                item.game_id == key
            }))
            games.push({game_id: key});
    };

    FieldData.addInfo(games, function(retMenus){
        res.json(func.formJsonMsg(1,{games: retMenus}));
    });
};
