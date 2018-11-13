const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Persona = function(){
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
        Models.Persona.findAll(consulta).then(function(personas){
            if(direcciones){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching person found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: personas
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
        Models.Persona.findOne(req.params.id).then(function(persona){
            if(!persona){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching person found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: persona
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
        if(!data.nombre || !data.apellido){
            return res.json({
                success: false,
                code: 400,
                error: "Missing name or last name parameter"
            });
        }
        Models.Persona.create(data).then(function(persona){
            if(persona){
                return res.json({
                    success: true,
                    code: 200,
                    resource: persona
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create person"
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
        Models.Persona.destroy({
            where: { direccion_id: req.params.id}
        }).then(function (persona) {
            return res.json({
                success: true,
                resource: persona
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
        Models.Persona.findOne(req.params.id).then(function(persona){
            if(!persona){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching persona found"
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

exports.Persona = new Persona();
