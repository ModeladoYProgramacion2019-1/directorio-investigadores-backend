const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Sede = function(){
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
        Models.Sede.findAll(consulta).then(function(sedes){
            if(sedes){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching campus found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: sedes
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
        Models.Sede.findOne(req.params.id).then(function(sede){
            if(!sede){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching campus found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: sede
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
};

let create = function(req, res){
    try{
        var data = req.body;
        if(!data.nombre){
            return res.json({
                success: false,
                code: 400,
                error: "Missing campus name parameter"
            });
        }
        Models.Sede.create(data).then(function(sede){
            if(sede){
                return res.json({
                    success: true,
                    code: 200,
                    resource: sede
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create campus"
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
        Models.Sede.destroy({
            where: { sede_id: req.params.id}
        }).then(function (sede) {
            return res.json({
                success: true,
                resource: sede
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
        Models.Sede.findOne(req.params.id).then(function(sede){
            if(!sede){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching campus found"
                });
            }else{
                sede.update(data).then(function(updated){
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

exports.Sede = new Sede();
