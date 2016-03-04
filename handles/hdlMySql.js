var Mysql = require('./../modelExt/extMysql');
var func = require('./func');


exports.getAll = function(req, res, next){
    Mysql.getAll(function(err, obj){
        if(err)
            return next(err);
        //find �������� ��δ�ҵ��򷵻����� []
        else if(obj.length == 0)
            return res.status(404).json(func.formJsonMsg(0,"Empty set : Mysql"));
        else
            return res.status(200).json(func.formJsonMsg(1, obj));
    });
};

exports.getByMysqlHostDb = function(req, res, next){
    Mysql.getOneByHostDb(req.params.host, req.params.database, function(err, obj){
        if(err)
            return next(err);
        else if(!obj)
            return res.status(404).json(func.formJsonMsg(0,"Mysql not found : " + req.params.host+ "," + req.params.db));
        else
            return res.status(200).json(func.formJsonMsg(1,new Array(obj)));
    });
};

exports.add = function(req, res, next){
    if(!req.body.host
        || !req.body.user
        || !req.body.database
        || !req.body.name)
    //412 ��δ����ǰ�������� ������δ���������������������õ�����һ��ǰ��������
        return res.status(412).json(func.formJsonMsg(0,"Require all params"));
    else{
        Mysql.getOneByHostDb(
            req.body.host,
            req.body.db,
            function(err, obj){
                if(err)
                    return next(err);
                else if(obj)
                //403 ����ֹ�� �������ܾ�����
                    return res.status(403).json(func.formJsonMsg(0,"Record exists"));
                else{
                    Mysql.add(
                        req.body.host,
                        req.body.user,
                        req.body.charset,
                        req.body.password,
                        req.body.database,
                        req.body.port,
                        req.body.name,
                        function(err, obj){
                            if(err)
                                return next(err);
                            return res.status(200).json(func.formJsonMsg(1, "Record add success"));
                        });
                }
            });
    }
};

exports.update = function(req, res, next){
    Mysql.updateByMysqlHostDb(
        req.params.host,
        req.params.database,
        req.body,
        function(err, obj){
            if(err){
                return next(err);
            }
            else if(!obj)
            //405 ��������ָ�������󷽷����ܱ�����������Ӧ����Դ���� PUT��DELETE ������Է������ϵ���Դ����д������
            //������󲿷ֵ���ҳ����������֧�ֻ�����Ĭ�������²������������󷽷������ڴ���������᷵��405����
                return res.status(405).json(func.formJsonMsg(0, "Record not found"));
            return res.status(200).json(func.formJsonMsg(1, "Record update success"));
        });
};

exports.del = function(req, res, next){
    Mysql.deleteOneByMysqlHostDb(
        req.params.host,
        req.params.database,
        function(err, obj){
            if(err)
                return next(err);
            else if(!obj)
                return res.status(405).json(func.formJsonMsg(0, "Record not found"));
            else
                return res.status(200).json(func.formJsonMsg(1, "Record delete success"));
        }
    );
};