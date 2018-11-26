const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Estudiante = function(){
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
            model: Models.Rol,
            include: [
              {model: Models.Permiso}
            ]
          },
          {
            model: Models.Campo
          },
          {
            model: Models.Investigador
          }
        ]
        Models.Estudiante.findAll(consulta).then(function(estudiantes){
            if(!estudiantes){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching student found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: estudiantes
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
        Models.Estudiante.findOne({
          where:{
              estudiante_id: req.params.id
          },
          include: [
            {
              model: Models.Rol,
              include: [
                {model: Models.Permiso}
              ]
            },
            {
              model: Models.Campo
            },
            {
              model: Models.Investigador
            }
          ]
        }).then(function(estudiante){
            if(!estudiante){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching student found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: estudiante
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
        if(!data.nivel_estudiando){
            return res.json({
                success: false,
                code: 400,
                error: "Missing current level of studies parameter"
            });
        }
        Models.Estudiante.create(data).then(function(estudiante){
            if(estudiante){
                return res.json({
                    success: true,
                    code: 200,
                    resource: estudiante
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create student"
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
        Models.Estudiante.destroy({
            where: { estudiante_id: req.params.id}
        }).then(function (estudiante) {
            return res.json({
                success: true,
                resource: estudiante
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
        Models.Estudiante.findOne({
            where:{
                estudiante_id: req.params.id
            }
        }).then(function(estudiante){
            if(!estudiante){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching student found"
                });
            }else{
                estudiante.update(data).then(function(updated){
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

exports.Estudiante = new Estudiante();
