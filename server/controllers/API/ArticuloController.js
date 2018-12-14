const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

let Articulo = function(){
    this.show = show;
    this.list = list;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

/*
	Method to list articles

	@param req request received to specify which articles list
	@param res response returned to the entity who made the request

	The method receives the query params through the request,
	and filters the articles in the database based on the query,
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
        consulta.include = [{model: Models.Persona}]
        Models.Articulo.findAll(consulta).then(function(articulos){
            if(!articulos){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching article found"
                });
            }else{
                return res.json({
                  success: true,
                  code: 200,
                  resource: articulos
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
  Method to show a specific article's information

  @param req request received to specify which article's information to show
  @param res response returned to the entity who made the request

  The method receives a request containing the article's id
	and returns a json containing the article's information
	whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let show = function(req, res){
    try{
        Models.Articulo.findOne({
            where: {
                articulo_id: req.params.id
            },
            include: [{model: Models.Persona}]
        }).then(function(articulo){
            if(!articulo){
                return res.json({
                  success: false,
                  code: 400,
                  error: "No matching article found"
                });
            }else{
                return res.json({
                    success: true,
                    code: 200,
                    resource: articulo
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
	Method to create a new article

  @param req request received containing the new article's information
  @param res response returned containing the new article's instance

  The method receives a request containing the new article's information
  and returns a json containing the new article's instance saved in the
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
        var autores = [];
        if(data.Autores){
            autores = data.Autores
            delete data.Autores;
        }
        Models.Articulo.create(data).then(async function(articulo){
            if(articulo){
                for(var i=0; i<autores.length; i++){
                    Models.PersonaEnArticulo.create({
                        persona_id: autores[i],
                        articulo_id: articulo.get("articulo_id")
                    });
                }
                return res.json({
                    success: true,
                    code: 200,
                    resource: articulo
                });
            }else{
                return res.json({
                    success: false,
                    code: 500,
                    error: "Could not create article"
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
  Method to destroy an article

  @param req request received to specify which article to destroy
  @param res response returned containing the article's instance that was
  destroyed

  The method receives a request containing the article's id,
  destroys the article and returns a json containing the
  article's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let destroy = function(req, res){
    try{
        Models.Articulo.destroy({
            where: { articulo_id: req.params.id}
        }).then(function (articulo) {
            return res.json({
                success: true,
                resource: articulo
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
  Method to update a specific article's information

  @param req request received to specify which article's information to update
  @param res response returned containing the article's instance

  The method receives a request containing the article's id,
  update article's information and returns a json containing
  the article's information whose id matches the received id

  @returns a json response with the query result or an error,
  and the corresponding response code
*/
let update = function(req, res){
    try{
        var data = req.body;
        Models.Articulo.findOne({
            where: {
                articulo_id: req.params.id
            }
        }).then(async function(articulo){
            if(!articulo){
                return res.json({
                    success: false,
                    code: 400,
                    error: "No matching article found"
                });
            }else{
                var autores = [];
                if(data.Autores){
                    autores = data.Autores
                    delete data.Autores;
                }
                for(var i=0; i<autores.length; i++){
                    try{
                        await Models.PersonaEnArticulo.create({
                            persona_id: autores[i],
                            articulo_id: articulo.get("articulo_id")
                        });
                    }catch(error){
                        console.log("Ya esta registrado ese autor")
                    }
                }
                articulo.update(data).then(function(updated){
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

exports.Articulo = new Articulo();
