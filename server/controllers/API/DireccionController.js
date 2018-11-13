const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Direccion = function(){
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
        Models.Direccion.findAll(consulta).then(function(direcciones){
            if(direcciones){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching adress found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: direcciones
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
        Models.Direccion.findOne(req.params.id).then(function(direccion){
            if(!direccion){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching address found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: direccion
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
        if(!data.estado){
            return res.json({
                success: false,
                code: 400,
                error: "Missing state parameter"
            });
        }
        Models.Direccion.create(data).then(function(direccion){
            if(direccion){
                return res.json({
                    success: true,
                    code: 200,
                    resource: direccion
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create address"
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
        Models.Direccion.destroy({
            where: { direccion_id: req.params.id}
        }).then(function (direccion) {
            return res.json({
                success: true,
                resource: direccion
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
        Models.Direccion.findOne(req.params.id).then(function(direccion){
            if(!direccion){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching address found"
                });
            }else{
                direccion.update(data).then(function(updated){
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

exports.Direccion = new Direccion();
