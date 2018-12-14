const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Contacto = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

/*
	Method to list contacts

	@param req request received to specify which contacts list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the contacts in the database based on the query,
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
        Models.Contacto.findAll(consulta).then(function(contactos){
            if(!contactos){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching contact found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: contactos
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
  Method to show a specific contact's information

  @param req request received to specify which contact's information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the contact's id
	and returns a json containing the contact's information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Contacto.findOne({
            where: {
                contacto_id: req.params.id
            }
        }).then(function(contacto){
            if(!contacto){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching contact found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: contacto
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
	Method to create a new contact

  @param req request received containing the new contact's information
  @param res response returned containing the new contact's instance

  The method receives a request containing the new contact's information
  and returns a json containing the new contact's instance saved in the
	database.

  @returns a json response with the query result or an error,
  and the corresponding response code
*/

let create = function(req, res){
    try{
        var data = req.body;
        if(!data.correo_personal){
            return res.json({
                success: false,
                code: 400,
                error: "Missing personal email parameter"
            });
        }
        Models.Contacto.create(data).then(function(contacto){
            if(contacto){
                return res.json({
                    success: true,
                    code: 200,
                    resource: contacto
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create contact"
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
  Method to destroy a contact

  @param req request received to specify which contact to destroy
  @param res response returned containing the contact's instance that was
  destroyed

  The method receives a request containing the contact's id,
  destroys the contact and returns a json containing the
  contact's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let destroy = function(req, res){
    try{
        Models.Contacto.destroy({
            where: { contacto_id: req.params.id}
        }).then(function (contacto) {
            return res.json({
                success: true,
                resource: contacto
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
  Method to update a specific contact's information

  @param req request received to specify which contact's information to update
  @param res response returned containing the contact's instance

  The method receives a request containing the contact's id,
  update contact's information and returns a json containing
  the contact's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let update = function(req, res){
    try{
        var data = req.body;
        Models.Contacto.findOne({
            where: {
                contacto_id: req.params.id
            }
        }).then(function(contacto){
            if(!contacto){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching address found"
                });
            }else{
                contacto.update(data).then(function(updated){
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

exports.Contacto = new Contacto();
