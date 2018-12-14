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

/*
	Method to list institutions

	@param req request received to specify which institutions list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the institutions in the database based on the query,
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

/*
  Method to show a specific institution's information

  @param req request received to specify which institution's information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the institution's id
	and returns a json containing the institution's information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
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


/*
	Method to create a new institution

  @param req request received containing the new institution's information
  @param res response returned containing the new institution's instance

  The method receives a request containing the new institution's information
  and returns a json containing the new institution's instance saved in the
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

/*
  Method to destroy an institucion

  @param req request received to specify which institucion to destroy
  @param res response returned containing the institucion's instance that was
  destroyed

  The method receives a request containing the institucion's id,
  destroys the institucion and returns a json containing the
  institucion's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
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

/*
  Method to update a specific institution's information

  @param req request received to specify which institution's information to update
  @param res response returned containing the institution's instance

  The method receives a request containing the institution's id,
  update institution's information and returns a json containing
  the institution's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
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
