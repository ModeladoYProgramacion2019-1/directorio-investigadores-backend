const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;
const Email = require('./EmailController').Email;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

let Authentication = function(){
    this.signUp = signUp;
}

let signUp = async function(req, res){
    try{
        if(!req.query.token){
            return res.json({
                success: false,
                code: 400,
                error: "No se recivió un token"
            });
        }

        var decoded = jwt.verify(req.query.token, process.env.JWT_key);
        console.log(decoded);
        if(!decoded.correo_personal || !decoded.nombre || !decoded.apellido){
            return res.json({
                success: false,
                code: 400,
                error: "Parametros incompletos"
            })
        }

        var contactoNuevo = await Models.Contacto.create({correo_personal: decoded.correo_personal});
        var data_persona = {
            nombre: decoded.nombre,
            apellido: decoded.apellido,
            contacto_id: contactoNuevo.get("contacto_id"),
            contraseña: bcrypt.hashSync(decoded.contraseña, bcrypt.genSaltSync(8))
        }
        var nueva = await Models.Persona.create(data_persona);

        var tokenData = {
            nombre: nueva.get("nombre")+" "+nueva.get("apellido"),
            correo: contactoNuevo.get("correo_personal"),
            contraseña: decoded.contraseña
        }
        var signupToken = jwt.sign(tokenData, process.env.JWT_key, {expiresIn: "3m"});
        Email.sendVerifyAccount(nueva, tokenData);

        return res.json({
            success:true,
            code: 200
        })
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error
        });
    }
}

exports.Authentication = new Authentication();
