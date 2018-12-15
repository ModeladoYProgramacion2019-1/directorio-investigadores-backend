const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Campo = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

/*
	Method to list fields

	@param req request received to specify which fields list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the fields in the database based on the query,
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
        Models.Campo.findAll(consulta).then(function(campos){
            if(!campos){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching field found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: campos
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
  Method to show a specific field's information

  @param req request received to specify which field's information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the field's id
	and returns a json containing the field's information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Campo.findOne({
            where: {
                campo_id: req.params.id
            }
        }).then(function(campo){
            if(!campo){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching field found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: campo
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
	Method to create a new field

  @param req request received containing the new field's information
  @param res response returned containing the new field's instance

  The method receives a request containing the new field's information
  and returns a json containing the new field's instance saved in the
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
        Models.Campo.create(data).then(function(campo){
            if(campo){
                return res.json({
                    success: true,
                    code: 200,
                    resource: campo
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create field"
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
  Method to destroy a field

  @param req request received to specify which field to destroy
  @param res response returned containing the field's instance that was
  destroyed

  The method receives a request containing the field's id,
  destroys the field and returns a json containing the
  field's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let destroy = function(req, res){
    try{
        Models.Campo.destroy({
            where: { campo_id: req.params.id}
        }).then(function (campo) {
            return res.json({
                success: true,
                resource: campo
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
  Method to update a specific field's information

  @param req request received to specify which field's information to update
  @param res response returned containing the field's instance

  The method receives a request containing the field's id,
  update field's information and returns a json containing
  the field's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let update = function(req, res){
    try{
        var data = req.body;
        Models.Campo.findOne({
            where: {
                campo_id: req.params.id
            }
        }).then(function(campo){
            if(!campo){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching field found"
                });
            }else{
                campo.update(data).then(function(updated){
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

exports.Campo = new Campo();
