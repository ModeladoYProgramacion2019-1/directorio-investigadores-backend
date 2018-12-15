const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Direccion = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

/*
	Method to list adresses

	@param req request received to specify which adresses list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the adresses in the database based on the query,
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
        Models.Direccion.findAll(consulta).then(function(direcciones){
            if(!direcciones){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching address found"
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
            error: error
        });
    }
}

/*
  Method to show a specific address information

  @param req request received to specify which address information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the address id
	and returns a json containing the address information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Direccion.findOne({
            where: {
                direccion_id: req.params.id
            }
        }).then(function(direccion){
            if(!direccion){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching address found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: direccion
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
	Method to create a new address

  @param req request received containing the new address information
  @param res response returned containing the new address instance

  The method receives a request containing the new address information
  and returns a json containing the new address instance saved in the
	database.

  @returns a json response with the query result or an error,
  and the corresponding response code
*/

let create = function(req, res){
    try{
        var data = req.body;
        if(!data.estado){
            return res.json({
                success: false,
                code: 400,
                error: "Missing state parameter"
            });
        }
        Models.Direccion.create(data).then(function(direccion){
            if(direccion){
                return res.json({
                    success: true,
                    code: 200,
                    resource: direccion
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create address"
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
  Method to destroy an address

  @param req request received to specify which address to destroy
  @param res response returned containing the address instance that was
  destroyed

  The method receives a request containing the address id,
  destroys the address and returns a json containing the
  address information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let destroy = function(req, res){
    try{
        Models.Direccion.destroy({
            where: { direccion_id: req.params.id}
        }).then(function (direccion) {
            return res.json({
                success: true,
                resource: direccion
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
  Method to update a specific address information

  @param req request received to specify which address information to update
  @param res response returned containing the address instance

  The method receives a request containing the address id,
  update address information and returns a json containing
  the address information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let update = function(req, res){
    try{
        var data = req.body;
        Models.Direccion.findOne({
            where: {
                direccion_id: req.params.id
            }
        }).then(function(direccion){
            if(!direccion){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching address found"
                });
            }else{
                direccion.update(data).then(function(updated){
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

exports.Direccion = new Direccion();
