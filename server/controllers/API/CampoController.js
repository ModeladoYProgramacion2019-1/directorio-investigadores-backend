const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Campo = function(){
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
        Models.Campo.findAll(consulta).then(function(campos){
            if(campos){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching field found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: campos
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
        Models.Campo.findOne(req.params.id).then(function(campo){
            if(!campo){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching field found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: campo
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
        if(!data.nombre){
            return res.json({
                success: false,
                code: 400,
                error: "Missing name of the field parameter"
            });
        }
        Models.Campo.create(data).then(function(campo){
            if(campo){
                return res.json({
                    success: true,
                    code: 200,
                    resource: campo
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create field"
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
        Models.Campo.destroy({
            where: { campo_id: req.params.id}
        }).then(function (campo) {
            return res.json({
                success: true,
                resource: campo
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
        Models.Campo.findOne(req.params.id).then(function(campo){
            if(!campo){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching field found"
                });
            }else{
                campo.update(data).then(function(updated){
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

exports.Campo = new Campo();
