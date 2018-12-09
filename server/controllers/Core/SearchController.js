const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;

var request = require('request');

let Search = function(){
    this.simpleSearch = simpleSearch;
    this.advancedSearch = advancedSearch;
}

let simpleSearch = async function(req, res){
    let searchedFor = req.body.data;

    let dataFound = {
        Persona: [],
        Institucion: [],
        Sede: [],
        Articulo: []
    }

    var sedesFound = Models.Sede.findAlll({
        where: {
            name: {[Op.like]: searchedFor}
        }
    });

}

let advancedSearch = function(req, res){
    return res.json({
        success: true,
        status: "In progress"
    });
}

exports.Search = new Search();
