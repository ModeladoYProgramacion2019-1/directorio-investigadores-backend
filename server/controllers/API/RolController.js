const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Rol = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

let list = function(req, res){
    try{
        var consulta = {}
        if(req.query){
            consulta.where = {}
            Object.keys(req.query).forEach(function(key){
                consulta.where[key] = CoreHelper.isLikeSearch(req.query[key]) ? {[Op.like]: req.query[key]} : req.query[key];
            });
        }
        consulta.include = [
          {
            model: Models.Permiso
          }
        ]
        Models.Rol.findAll(consulta).then(function(roles){
            if(!roles){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching rol found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: roles
                });
            }
        });
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error
        });
    }
}

let show = function(req, res){
    try{
        Models.Rol.findOne({
            where: {
                rol_id: req.params.id
            },
            include: [
              {
                model: Models.Permiso
              }
            ]
        }).then(function(rol){
            if(!rol){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching rol found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: rol
                });
            }
        });
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error
        });
    }
};

let create = function(req, res){
    try{
        var data = req.body;
        if(!data.nombre){
            return res.json({
                success: false,
                code: 400,
                error: "Missing name parameter"
            });
        }
        Models.Rol.create(data).then(function(rol){
            if(rol){
                return res.json({
                    success: true,
                    code: 200,
                    resource: rol
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create rol"
                });
            }
        });
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error
        });
    }
}

let destroy = function(req, res){
    try{
        Models.Rol.destroy({
            where: { rol_id: req.params.id}
        }).then(function (rol) {
            return res.json({
                success: true,
                resource: rol
            });
        });
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error
        });
    }
}

let update = function(req, res){
    try{
        var data = req.body;
        Models.Rol.findOne({
            where: {
                rol_id: req.params.id
            }
        }).then(function(rol){
            if(!rol){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching rol found"
                });
            }else{
                rol.update(data).then(function(updated){
                    return res.json({
                        success: true,
                        code: 200,
                        resource: updated
                    });
                });
            }
        });
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error
        });
    }
}

exports.Rol = new Rol();
