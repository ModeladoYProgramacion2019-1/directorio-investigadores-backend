const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Sede = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

/*
	Method to list campus

	@param req request received to specify which campus list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the campus in the database based on the query,
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
            model: Models.Persona
          },
          {
            model: Models.Institucion
          },
          {
            model: Models.Direccion
          },
          {
            model: Models.Contacto
          }
        ]
        Models.Sede.findAll(consulta).then(function(sedes){
            if(!sedes){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching campus found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: sedes
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
  Method to show a specific campus information

  @param req request received to specify which campus information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the campus id
	and returns a json containing the campus information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Sede.findOne({
            where: {
                sede_id: req.params.sede_id
            },
            include: [
              {
                model: Models.Persona
              },
              {
                model: Models.Institucion
              },
              {
                model: Models.Direccion
              },
              {
                model: Models.Contacto
              }
            ]
        }).then(function(sede){
            if(!sede){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching campus found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: sede
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
	Method to create a new campus

  @param req request received containing the new campus information
  @param res response returned containing the new campus instance

  The method receives a request containing the new campus information
  and returns a json containing the new campus instance saved in the
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
                error: "Missing campus name parameter"
            });
        }
        Models.Sede.create(data).then(function(sede){
            if(sede){
                return res.json({
                    success: true,
                    code: 200,
                    resource: sede
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create campus"
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
  Method to destroy a campus

  @param req request received to specify which campus to destroy
  @param res response returned containing the campus instance that was
  destroyed

  The method receives a request containing the campus id,
  destroys the campus and returns a json containing the
  campus information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let destroy = function(req, res){
    try{
        Models.Sede.destroy({
            where: { sede_id: req.params.id}
        }).then(function (sede) {
            return res.json({
                success: true,
                resource: sede
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
  Method to update a specific campus information

  @param req request received to specify which campus information to update
  @param res response returned containing the campus instance

  The method receives a request containing the campus id,
  update campus information and returns a json containing
  the campus information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let update = function(req, res){
    try{
        var data = req.body;
        Models.Sede.findOne({
            where: {
                sede_id: req.params.id
            }
        }).then(function(sede){
            if(!sede){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching campus found"
                });
            }else{
                sede.update(data).then(function(updated){
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

exports.Sede = new Sede();
