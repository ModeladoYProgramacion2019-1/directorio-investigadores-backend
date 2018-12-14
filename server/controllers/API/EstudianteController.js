const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Estudiante = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};


/*
	Method to list students

	@param req request received to specify which students list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the students in the database based on the query,
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
          },
          {
            model: Models.Campo
          },
          {
            model: Models.Investigador
          }
        ]
        Models.Estudiante.findAll(consulta).then(function(estudiantes){
            if(!estudiantes){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching student found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: estudiantes
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
  Method to show a specific student's information

  @param req request received to specify which student's information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the student's id
	and returns a json containing the student's information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Estudiante.findOne({
          where:{
              estudiante_id: req.params.id
          },
          include: [
            {
              model: Models.Rol,
              include: [
                {model: Models.Permiso}
              ]
            },
            {
              model: Models.Campo
            },
            {
              model: Models.Investigador
            }
          ]
        }).then(function(estudiante){
            if(!estudiante){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching student found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: estudiante
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
	Method to create a new student

  @param req request received containing the new student's information
  @param res response returned containing the new student's instance

  The method receives a request containing the new student's information
  and returns a json containing the new student's instance saved in the
	database.

  @returns a json response with the query result or an error,
  and the corresponding response code
*/

let create = function(req, res){
    try{
        var data = req.body;
        if(!data.nivel_estudiando){
            return res.json({
                success: false,
                code: 400,
                error: "Missing current level of studies parameter"
            });
        }
        Models.Estudiante.create(data).then(function(estudiante){
            if(estudiante){
                return res.json({
                    success: true,
                    code: 200,
                    resource: estudiante
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create student"
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
  Method to destroy a student

  @param req request received to specify which student to destroy
  @param res response returned containing the student's instance that was
  destroyed

  The method receives a request containing the student's id,
  destroys the student and returns a json containing the
  student's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/

let destroy = function(req, res){
    try{
        Models.Estudiante.destroy({
            where: { estudiante_id: req.params.id}
        }).then(function (estudiante) {
            return res.json({
                success: true,
                resource: estudiante
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
  Method to update a specific student's information

  @param req request received to specify which student's information to update
  @param res response returned containing the student's instance

  The method receives a request containing the student's id,
  update student's information and returns a json containing
  the student's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/

let update = function(req, res){
    try{
        var data = req.body;
        Models.Estudiante.findOne({
            where:{
                estudiante_id: req.params.id
            }
        }).then(function(estudiante){
            if(!estudiante){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching student found"
                });
            }else{
                estudiante.update(data).then(function(updated){
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

exports.Estudiante = new Estudiante();
