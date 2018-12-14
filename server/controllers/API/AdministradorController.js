const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Administrador = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

/*
	Method to list administrators

	@param req request received to specify which administrators list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the administrators in the database based on the query,
	returning the result of the query as a json.

	@returns a json response with the query result or an error,
	and the corresponding response code
*/

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
          }
        ]
        Models.Administrador.findAll(consulta).then(function(administradores){
            if(!administradores){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching admin found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: administradores
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

/*
  Method to show a specific administrator's information

  @param req request received to specify which administrator's information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the administrator's id
	and returns a json containing the administrator's information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Administrador.findOne({
          where: {
              administrador_id: req.params.id
          },
          include: [
            {
              model: Models.Rol,
              include: [
                {model: Models.Permiso}
              ]
            }
          ]
        }).then(function(administrador){
            if(!administrador){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching admin found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: administrador
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

/*
	Method to create a new administrator

  @param req request received containing the new administrator's information
  @param res response returned containing the new administrator's instance

  The method receives a request containing the new administrator's information
  and returns a json containing the new administrator's instance saved in the
	database.

  @returns a json response with the query result or an error,
  and the corresponding response code
*/

let create = function(req, res){
    try{
        var data = req.body;
        if(!data.id_persona){
            return res.json({
                success: false,
                code: 400,
                error: "Missing persona_id parameter"
            });
        }
        Models.Administrador.create(data).then(function(administrador){
            if(administrador){
                return res.json({
                    success: true,
                    code: 200,
                    resource: administrador
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create admin"
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

/*
  Method to destroy an administrator

  @param req request received to specify which administrator to destroy
  @param res response returned containing the administrator's instance that was
  destroyed

  The method receives a request containing the administrator's id,
  destroys the administrator and returns a json containing the
  administrator's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let destroy = function(req, res){
    try{
        Models.Administrador.destroy({
            where: {
              administrador_id: req.params.id
            }
        }).then(function (administrador) {
            return res.json({
                success: true,
                resource: administrador
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

/*
  Method to update a specific administrator's information

  @param req request received to specify which administrator's information to update
  @param res response returned containing the administrator's instance

  The method receives a request containing the administrator's id,
  update administrator's information and returns a json containing
  the administrator's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let update = function(req, res){
    try{
        var data = req.body;
        Models.Administrador.findOne({
            where:{
                administrador_id: req.params.id
            }
        }).then(function(administrador){
            if(!administrador){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching admin found"
                });
            }else{
                administrador.update(data).then(function(updated){
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

exports.Administrador = new Administrador();
