const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Persona = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

/*
	Method to list people

	@param req request received to specify which people list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the people in the database based on the query,
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
            model: Models.Grupo
          },
          {
            model: Models.Sede
          },
          {
            model: Models.Articulo
          },
          {
            model: Models.Direccion
          },
          {
            model: Models.Contacto
          },
          {
            model: Models.Administrador,
            include: [
              {
                model: Models.Rol,
                include: [
                  {model: Models.Permiso}
                ]
              }
            ]
          },
          {
            model: Models.Estudiante,
            include: [
              {
                model: Models.Campo
              },
              {
                model: Models.Investigador
              },
              {
                model: Models.Rol,
                include: [
                  {model: Models.Permiso}
                ]
              }
            ]
          },
          {
            model: Models.Investigador,
            include: [
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
          }
        ]
        Models.Persona.findAll(consulta).then(function(personas){
            if(!personas){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching person found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: personas
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
  Method to show a specific person's information

  @param req request received to specify which person's information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the person's id
	and returns a json containing the person's information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Persona.findOne({
            where: {
                persona_id: req.params.id
            },
            include: [
              {
                model: Models.Grupo
              },
              {
                model: Models.Sede
              },
              {
                model: Models.Articulo
              },
              {
                model: Models.Direccion
              },
              {
                model: Models.Contacto
              },
              {
                model: Models.Administrador,
                include: [
                  {
                    model: Models.Rol,
                    include: [
                      {model: Models.Permiso}
                    ]
                  }
                ]
              },
              {
                model: Models.Estudiante,
                include: [
                  {
                    model: Models.Campo
                  },
                  {
                    model: Models.Investigador
                  },
                  {
                    model: Models.Rol,
                    include: [
                      {model: Models.Permiso}
                    ]
                  }
                ]
              },
              {
                model: Models.Investigador,
                include: [
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
              }
            ]
        }).then(function(persona){
            if(!persona){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching person found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: persona
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
	Method to create a new person

  @param req request received containing the new person's information
  @param res response returned containing the new person's instance

  The method receives a request containing the new person's information
  and returns a json containing the new person's instance saved in the
	database.

  @returns a json response with the query result or an error,
  and the corresponding response code
*/

let create = function(req, res){
    try{
        var data = req.body;
        if(!data.nombre || !data.apellido){
            return res.json({
                success: false,
                code: 400,
                error: "Missing name or last name parameter"
            });
        }
        Models.Persona.create(data).then(function(persona){
            if(persona){
                return res.json({
                    success: true,
                    code: 200,
                    resource: persona
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create person"
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
  Method to destroy a person

  @param req request received to specify which person to destroy
  @param res response returned containing the person's instance that was
  destroyed

  The method receives a request containing the person's id,
  destroys the person and returns a json containing the
  person's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let destroy = function(req, res){
    try{
        Models.Persona.destroy({
            where: { persona_id: req.params.id}
        }).then(function (persona) {
            return res.json({
                success: true,
                resource: persona
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
  Method to update a specific person's information

  @param req request received to specify which person's information to update
  @param res response returned containing the person's instance

  The method receives a request containing the person's id,
  update person's information and returns a json containing
  the person's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let update = function(req, res){
    try{
        var data = req.body;
        Models.Persona.findOne({
            where: {
                persona_id: req.params.id
            }
        }).then(function(persona){
            if(!persona){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching person found"
                });
            }else{
                persona.update(data).then(function(updated){
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

exports.Persona = new Persona();
