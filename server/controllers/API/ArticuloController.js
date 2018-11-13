const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Articulo = function(){
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
        Models.Articulo.findAll(consulta).then(function(articulos){
            if(articulos){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching article found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: articulos
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
        Models.Articulo.findOne(req.params.id).then(function(articulo){
            if(!articulo){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching article found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: articulo
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
                error: "Missing title of the article parameter"
            });
        }
        Models.Articulo.create(data).then(function(articulo){
            if(articulo){
                return res.json({
                    success: true,
                    code: 200,
                    resource: articulo
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create article"
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
        Models.Articulo.destroy({
            where: { articulo_id: req.params.id}
        }).then(function (articulo) {
            return res.json({
                success: true,
                resource: articulo
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
        Models.Articulo.findOne(req.params.id).then(function(articulo){
            if(!articulo){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching article found"
                });
            }else{
                articulo.update(data).then(function(updated){
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

exports.Articulo = new Articulo();
