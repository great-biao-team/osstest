var express = require('express');
var router = express.Router();
var hdlDefault = require('./../handles/hdlDefault');
var hdlSession = require('./../handles/hdlSession');

var hdlUser = require('./../handles/hdlUser');
var hdlRolePrivilege = require('./../handles/hdlRolePrivilege');
var hdlRole = require('./../handles/hdlRole');
var hdlPrivilege = require('./../handles/hdlPrivilege');
var hdlPlatform = require('./../handles/hdlPlatform');
var hdlGame = require('./../handles/hdlGame');
var hdlMenu = require('./../handles/hdlMenu');
var hdlMySql = require('./../handles/hdlMySql');
var hdlUseSql = require('./../handles/hdlUseSql');
var hdlServerList = require('./../handles/hdlServerList');
var hdlQueryConfig = require('./../handles/hdlQueryConfig');

//页面跳转
router.get('/', hdlDefault.toLoginPage);
router.get('/login', hdlDefault.toLoginPage);
router.get('/home', hdlSession.validSession, hdlDefault.toHomePage);
router.get('/gamedata/:game_id',hdlSession.validSession, hdlDefault.toGamePage);


router.get('/user/:game_id', hdlDefault.toUserPage);
router.get('/business/:game_id',hdlSession.validSession, hdlDefault.toBusinessPage);


router.get('/logout',hdlSession.destroy);

router.get('/rolelist',hdlDefault.toRoleListPage);
router.get('/rolemodify',hdlDefault.toRoleModifyPage);

//api
//后续考虑的api分类：本地数据增删改查使用，直接调用的功能（如使用查询语句）
//删除、更新操作，全都需要指定唯一的索引
router.get('/api/user', hdlUser.getAll);
router.get('/api/user/:name', hdlUser.getByName);
router.post('/api/user', hdlUser.add);
router.put('/api/user/:name', hdlUser.update);
router.delete('/api/user/:name', hdlUser.del);
router.post('/api/user/check', hdlUser.checkUserPassword, hdlSession.init);
router.get('/api/test/:game_id/:menu_id', hdlQueryConfig.getInitDataByGameAndMenu);

//这个的链接和前面重了...
router.get('/api/users/:role_id', hdlUser.getSomeByRoleId);

router.post("/api/check", hdlUser.checkUserPassword, hdlSession.init);
router.get("/api/gamelist", hdlSession.validSession, hdlSession.gameList);
router.get("/api/itemList", hdlSession.validSession, hdlSession.itemList);

router.get('/api/roleprivilege', hdlRolePrivilege.getAll);
router.get('/api/roleprivilege/:role_id', hdlRolePrivilege.getByRoleId);
router.post('/api/roleprivilege', hdlRolePrivilege.add);
router.put('/api/roleprivilege/:role_id/:privilege_id', hdlRolePrivilege.update);
router.delete('/api/roleprivilege/:role_id/:privilege_id', hdlRolePrivilege.del);

router.get('/api/serverlist/all', hdlServerList.getAll);

router.get('/api/role', hdlRole.getAll);
router.get('/api/role/:role_id', hdlRole.getByRoleId);
router.post('/api/role', hdlRole.add);
router.put('/api/role/:role_id', hdlRole.update);
router.delete('/api/role/:role_id', hdlRole.del);

router.get('/api/privilege', hdlPrivilege.getAll);
router.get('/api/privilege/:privilege_id', hdlPrivilege.getByPrivilegeId);
router.post('/api/privilege', hdlPrivilege.add);
router.put('/api/privilege/:privilege_id', hdlPrivilege.update);
router.delete('/api/privilege/:privilege_id', hdlPrivilege.del);

router.get('/api/platform', hdlPlatform.getAll);
router.get('/api/platform/:game_platform', hdlPlatform.getByGamePlatform);
router.post('/api/platform', hdlPlatform.add);
router.put('/api/platform/:game_platform', hdlPlatform.update);
router.delete('/api/platform/:game_platform', hdlPlatform.del);

router.get('/api/game', hdlGame.getAll)
router.get('/api/game/:game_id', hdlGame.getByGameId);
router.post('/api/game', hdlGame.add);
router.put('/api/game/:game_id', hdlGame.update);
router.delete('/api/game/:game_id', hdlGame.del);

router.get('/api/menu', hdlMenu.getAll);
router.get('/api/menu/:game_id', hdlMenu.getByMenuId);
router.post('/api/menu', hdlMenu.add);
router.put('/api/menu/:menu', hdlMenu.update);
router.delete('/api/menu/:menu', hdlMenu.del);

router.get('/api/sqlConfig', hdlMySql.getAll);
router.get('/api/sqlConfig/:host/:database', hdlMySql.getByMysqlHostDb);
router.post('/api/sqlConfig', hdlMySql.add);
router.put('/api/sqlConfig/:host/:database', hdlMySql.update);
router.delete('/api/sqlConfig/:host/:database', hdlMySql.del);

router.get('/api/useSql/:host/:database', hdlUseSql.useSql);

router.get('/api/system/reset_privileges', hdlDefault.resetPrivileges);



module.exports = router;