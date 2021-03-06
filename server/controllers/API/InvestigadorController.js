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

/*
	Method to list researchers

	@param req request received to specify which researchers list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the researchers in the database based on the query,
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
        consulta. include = [
          {
            model: Models.Estudiante
          },
          {
            model: Models.Rol,
            include: [
              {model: Models.Permiso}
            ]
          },
          {
            model: Models.Campo
          }
        ]
        Models.Investigador.findAll(consulta).then(function(investigadores){
            if(!investigadores){
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
            error: error
        });
    }
}

/*
  Method to show a specific researcher's information

  @param req request received to specify which researcher's information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the researcher's id
	and returns a json containing the researcher's information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Investigador.findOne({
            where: {
                investigador_id: req.params.id
            },
            include : [
              {
                model: Models.Estudiante
              },
              {
                model: Models.Rol,
                include: [
                  {model: Models.Permiso}
                ]
              },
              {
                model: Models.Campo
              }
            ]
        }).then(function(investigador){
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
            error: error
        });
    }
}

/*
	Method to create a new researcher

  @param req request received containing the new researcher's information
  @param res response returned containing the new researcher's instance

  The method receives a request containing the new researcher's information
  and returns a json containing the new researcher's instance saved in the
	database.

  @returns a json response with the query result or an error,
  and the corresponding response code
*/

let create = function(req, res){
    try{
        var data = req.body;
        if(!data.titulo){
            return res.json({
                success: false,
                code: 400,
                error: "Missing title parameter"
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
            error: error
        });
    }
}

/*
  Method to destroy a researcher

  @param req request received to specify which researcher to destroy
  @param res response returned containing the researcher's instance that was
  destroyed

  The method receives a request containing the researcher's id,
  destroys the researcher and returns a json containing the
  researcher's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
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
            error: error
        });
    }
}

/*
  Method to update a specific researcher's information

  @param req request received to specify which researcher's information to update
  @param res response returned containing the researcher's instance

  The method receives a request containing the researcher's id,
  update researcher's information and returns a json containing
  the researcher's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let update = function(req, res){
    try{
        var data = req.body;
        Models.Investigador.findOne({
            where: {
                investigador_id: req.params.id
            }
        }).then(function(investigador){
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
            error: error
        });
    }
}

exports.Investigador = new Investigador();
