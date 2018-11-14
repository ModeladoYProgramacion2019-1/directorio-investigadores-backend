const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Investigador = function(){
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
        Models.Investigador.findAll(consulta).then(function(investigadores){
            if(investigadores){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching researcher found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: investigadores
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
        Models.Investigador.findOne(req.params.id).then(function(investigador){
            if(!investigador){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching researcher found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: investigador
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
        if(!data.titulo){
            return res.json({
                success: false,
                code: 400,
                error: "Missing title researcher name parameter"
            });
        }
        Models.Investigador.create(data).then(function(investigador){
            if(investigador){
                return res.json({
                    success: true,
                    code: 200,
                    resource: investigador
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create researcher"
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
        Models.Investigador.destroy({
            where: { investigador_id: req.params.id}
        }).then(function (investigador) {
            return res.json({
                success: true,
                resource: investigador
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
        Models.Investigador.findOne(req.params.id).then(function(investigador){
            if(!investigador){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching researcher found"
                });
            }else{
                investigador.update(data).then(function(updated){
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

exports.Investigador = new Investigador();
