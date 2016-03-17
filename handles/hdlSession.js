var hdlDefault = require('./hdlDefault');
var func = require('./func');
var User = require('./../modelExt/extUser');
var FieldData = require('./../modelExt/extFieldData');

//登录成功，重置session
exports.init = function(req, res){
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
    if(req.session.user) {
        var is_pass = false;
        var arr = req.path.split("/");
        console.log(arr);
        if(arr[1] == "home")
            next();
        else if(arr[1] == "gamedata")
            next();
        else
            next();
    }
    else
    {
        hdlDefault.toLoginPage(req, res);
    }

};

//session 数据
exports.gameList = function(req, res){
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

exports.itemList = function(req, res){
    //session失效后会有server error
    var games = [];
    for(var i in req.session.availablePath){
        var data_game = {game_id: i, menus:[]};

        for(var j in req.session.availablePath[i]){
            var data_menus = {menu_id: j, platforms: []};

            req.session.availablePath[i][j].forEach(function(e){
                var data_platform = {game_platform: e};
                data_menus.platforms.push(data_platform);
            });

            FieldData.addInfo(data_menus.platforms,function(result){
                data_menus.platforms = result;
            });

            data_game.menus.push(data_menus);
        }

        FieldData.addInfo(data_game.menus,function(result){
            data_game.menus = result;
        });
        games.push(data_game);
    }
    FieldData.addInfo(games,function(result){
        games = result;
    });
    res.json(func.formJsonMsg(1,{game: games}));
}