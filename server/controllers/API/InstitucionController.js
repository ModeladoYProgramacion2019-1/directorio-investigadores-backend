const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Institucion = function(){
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
        consulta.include =  [
          {
            model: Models.Sede,
          },
          {
            model: Models.Grupo
          }
        ]
        Models.Institucion.findAll(consulta).then(function(instituciones){
            if(!instituciones){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching institution found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: instituciones
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
        Models.Institucion.findOne({
            where: {
                institucion_id: req.params.id
            },
            include: [
              {
                model: Models.Sede,
              },
              {
                model: Models.Grupo
              }
            ]
        }).then(function(institucion){
            if(!institucion){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching institution found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: institucion
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
        Models.Institucion.create(data).then(function(institucion){
            if(institucion){
                return res.json({
                    success: true,
                    code: 200,
                    resource: institucion
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create institution"
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
        Models.Institucion.destroy({
            where: { institucion_id: req.params.id}
        }).then(function (institucion) {
            return res.json({
                success: true,
                resource: institucion
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
        Models.Institucion.findOne({
            whre: {
                institucion_id: req.params.id
            }
        }).then(function(institucion){
            if(!institucion){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching institution found"
                });
            }else{
                institucion.update(data).then(function(updated){
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

exports.Institucion = new Institucion();
