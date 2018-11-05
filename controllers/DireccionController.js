const Models  = require('../models/index');

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
                consulta.where[key] = req.query[key];
            });
        }
        console.log(consulta);
        Models.Direccion.findAll(consulta).then(function(direcciones){
            if(direcciones){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No se encontraron direcciones con los atributos especificados"
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
        })
    }
}

let show = function(req, res){

}

let create = function(req, res){

}

let destroy = function(req, res){

}

let update = function(req, res){

}
exports.Direccion = new Direccion();
