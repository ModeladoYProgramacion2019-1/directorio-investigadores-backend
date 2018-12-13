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
        let searchedFor = req.body.data;
        let dataFound = {
            Persona: [],
            Grupo: [],
            Sede: [],
            Articulo: []
        }

        var seatsFound = await Models.Sede.findAll({
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
                // Buscar correo en la tabla direccion        
            }
        });
        
        var groupsFound = await Models.Grupo.findAll({
            where: {
                nombre: {[Op.like]: searchedFor}
            }
        });
        
        dataFound.Persona.push(personsFound);
        dataFound.Grupo.push(groupsFound);
        dataFound.Sede.push(seatsFound);
        dataFound.Articulo.push(articlesFound);
        
        return res.json({
            success: true,
            code: 200,
            resource: dataFound
            
        })}catch(error){
            console.log(error);
            return res.json({
                success: false,
                code: 500,
                error: error
        });
        }
            
}

let advancedSearch = function(req, res){
    let searchedFor = req.body.data;
    let 
    return res.json({
        success: true,
        status: "In progress"
    });
}

exports.Search = new Search();
