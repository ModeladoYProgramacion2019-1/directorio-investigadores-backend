const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

var request = require('request');

let Search = function(){
    this.simpleSearch = simpleSearch;
    this.advancedSearch = advancedSearch;
}

let simpleSearch = async function(req, res){
    try{
        console.log(req.body);
        let searchedFor = CoreHelper.isLike(req.body.data);
        console.log(searchedFor);
        let dataFound = {
            Persona: [],
            Grupo: [],
            Sede: [],
            Articulo: []
        }

        var seatsFound = await Models.Sede.findAll({
            attributes: [
                'sede_id', 'nombre',
                'descripcion', 'direccion_id',
                'institucion_id', 'contacto_id'
            ],
            where: {
                nombre: {[Op.like]: searchedFor}
            }
        });

        var articlesFound = await Models.Articulo.findAll({
            where: {
                [Op.or]:
                    [{titulo: {[Op.like]: searchedFor}},
                    {revista: {[Op.like]: searchedFor}}]
            }
        });

        var personsFound = await Models.Persona.findAll({
            where: {
                [Op.or]:
                    [{nombre: {[Op.like]: searchedFor}},
                    {apellido: {[Op.like]: searchedFor}}]
            },include: [{
                model: Models.Contacto,
                where: {
                    [Op.or]:
                        [{correo_personal: {[Op.like]: searchedFor}},
                        {correo_institucion: {[Op.like]: searchedFor}}]
                }
            }]
        });

        var groupsFound = await Models.Grupo.findAll({
            where: {
                nombre: {[Op.like]: searchedFor}
            }
        });

        dataFound.Persona = personsFound;
        dataFound.Grupo = groupsFound;
        dataFound.Sede = seatsFound;
        dataFound.Articulo = articlesFound;
        console.log(dataFound.toString())
        return res.json({
            success: true,
            code: 200,
            resource: dataFound 
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
/* This is not completely finished, it allows for partial advanced searches so far
*/
let advancedSearch = async function(req, res){
    try{ 
        let results = {}
        if (req.body.Sede){
            var searchedFor = req.body.Sede;
            var seatsFound = await Models.Sede.findAll({
                where: {
                    nombre: {[Op.like]: CoreHelper.isLike(searchedFor.nombre)}
                }
            });
            console.log("Buscando en Sede");
            results = {
                Sede: seatsFound
            }
            
        }else if(req.body.Articulo){
            var searchedFor = req.body.Articulo;
            var articlesFound = await Models.Articulo.findAll({
                where: {
                    titulo: CoreHelper.isLike(searchedFor.titulo)
                }, include: [{
                    model: Models.Campo
                }]
            });
            console.log("Buscando en Articulo");
            results = {
                Articulo: articlesFound
            }
            
        }else if(req.body.Persona){
            var searchedFor = req.body.Persona;
            var personsFound = await Models.Persona.findAll({
                where: {
                    [Op.or]:
                        [{nombre: {[Op.like]: CoreHelper.isLike(searchedFor.nombre)}},
                        {apellido: {[Op.like]: CoreHelper.isLike(searchedFor.apellido)}}]
            },include: [{
                model: Models.Contacto,
                where: {
                    [Op.or]:
                        [{correo_personal: {[Op.like]: CoreHelper.isLike(searchedFor.correo)}},
                        {correo_institucion: {[Op.like]: CoreHelper.isLike(searchedFor.correo)}}]
                }
                }]
            });
            console.log("Buscando en Persona");
            results = {
                Persona: personsFound
            }
        }return res.json({
            success: true,
            code: 200,
            resource: results 
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

exports.Search = new Search();
