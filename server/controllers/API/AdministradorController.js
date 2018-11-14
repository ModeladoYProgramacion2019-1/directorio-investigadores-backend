const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Administrador = function(){
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
            console.log(req.query);
            consulta.where = {}
            Object.keys(req.query).forEach(function(key){
                consulta.where[key] = CoreHelper.isLikeSearch(req.query[key]) ? {[Op.like]: req.query[key]} : req.query[key];
            });
        }
        console.log(consulta);
        Models.Administrador.findAll(consulta).then(function(administradores){
            if(administradores){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching admin found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: administradores
                });
            }
        });
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error.toString()
        });
    }
}

let show = function(req, res){
    try{
        Models.Administrador.findOne(req.params.id).then(function(administrador){
            if(!administrador){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching admin found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: administrador
                });
            }
        });
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error.toString()
        });
    }
}

let create = function(req, res){
    try{
        var data = req.body;
        if(!data.id_persona){
            return res.json({
                success: false,
                code: 400,
                error: "Missing admin name parameter"
            });
        }
        Models.Administrador.create(data).then(function(administrador){
            if(administrador){
                return res.json({
                    success: true,
                    code: 200,
                    resource: administrador
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create admin"
                });
            }
        });
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error.toString()
        });
    }
}

let destroy = function(req, res){
    try{
        Models.Administrador.destroy({
            where: { administrador_id: req.params.id}
        }).then(function (administrador) {
            return res.json({
                success: true,
                resource: administrador
            });
        });
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error.toString()
        });
    }
}

let update = function(req, res){
    try{
        var data = req.body;
        Models.Administrador.findOne(req.params.id).then(function(administrador){
            if(!administrador){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching admin found"
                });
            }else{
                administrador.update(data).then(function(updated){
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
            error: error.toString()
        });
    }
}

exports.Administrador = new Administrador();
