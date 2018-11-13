const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Contacto = function(){
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
        Models.Contacto.findAll(consulta).then(function(contactos){
            if(contactos){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching contact found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: contactos
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
        Models.Contacto.findOne(req.params.id).then(function(contacto){
            if(!contacto){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching contact found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: contacto
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
        if(!data.correo_personal){
            return res.json({
                success: false,
                code: 400,
                error: "Missing personal email parameter"
            });
        }
        Models.Contacto.create(data).then(function(contacto){
            if(contacto){
                return res.json({
                    success: true,
                    code: 200,
                    resource: contacto
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create contact"
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
        Models.Contacto.destroy({
            where: { contacto_id: req.params.id}
        }).then(function (contacto) {
            return res.json({
                success: true,
                resource: contacto
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
        Models.Contacto.findOne(req.params.id).then(function(contacto){
            if(!contacto){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching address found"
                });
            }else{
                contacto.update(data).then(function(updated){
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

exports.Contacto = new Contacto();
