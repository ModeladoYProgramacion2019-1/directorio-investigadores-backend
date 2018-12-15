const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Rol = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

/*
	Method to list rols

	@param req request received to specify which rols list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the rols in the database based on the query,
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
        consulta.include = [
          {
            model: Models.Permiso
          }
        ]
        Models.Rol.findAll(consulta).then(function(roles){
            if(!roles){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching rol found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: roles
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
  Method to show a specific rol's information

  @param req request received to specify which rol's information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the rol's id
	and returns a json containing the rol's information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Rol.findOne({
            where: {
                rol_id: req.params.id
            },
            include: [
              {
                model: Models.Permiso
              }
            ]
        }).then(function(rol){
            if(!rol){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching rol found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: rol
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
};

/*
	Method to create a new rol

  @param req request received containing the new rol's information
  @param res response returned containing the new rol's instance

  The method receives a request containing the new rol's information
  and returns a json containing the new rol's instance saved in the
	database.

  @returns a json response with the query result or an error,
  and the corresponding response code
*/

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
        Models.Rol.create(data).then(function(rol){
            if(rol){
                return res.json({
                    success: true,
                    code: 200,
                    resource: rol
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create rol"
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
  Method to destroy a rol

  @param req request received to specify which rol to destroy
  @param res response returned containing the rol's instance that was
  destroyed

  The method receives a request containing the rol's id,
  destroys the rol and returns a json containing the
  rol's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let destroy = function(req, res){
    try{
        Models.Rol.destroy({
            where: { rol_id: req.params.id}
        }).then(function (rol) {
            return res.json({
                success: true,
                resource: rol
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
  Method to update a specific rol's information

  @param req request received to specify which rol's information to update
  @param res response returned containing the rol's instance

  The method receives a request containing the rol's id,
  update rol's information and returns a json containing
  the rol's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let update = function(req, res){
    try{
        var data = req.body;
        Models.Rol.findOne({
            where: {
                rol_id: req.params.id
            }
        }).then(function(rol){
            if(!rol){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching rol found"
                });
            }else{
                rol.update(data).then(function(updated){
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

exports.Rol = new Rol();
