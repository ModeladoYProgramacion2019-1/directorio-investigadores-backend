const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;
const Email = require('./EmailController').Email;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

let Authentication = function(){
    this.signUp = signUp;
    this.acceptVerification = acceptVerification;
}

let signUp = async function(req, res){
    try{
        if(!req.query.token){
            return res.json({
                success: false,
                code: 400,
                error: "No se recibió una ficha"
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
            contraseña: bcrypt.hashSync(decoded.contraseña, bcrypt.genSaltSync(8)),
            is_verified: false
        }
        var nueva = await Models.Persona.create(data_persona);

        var tokenData = {
            nombre: nueva.get("nombre")+" "+nueva.get("apellido"),
            correo: contactoNuevo.get("correo_personal"),
            contraseña: decoded.contraseña,
            persona_id: nueva.get("persona_id")
        }
        var signupToken = jwt.sign(tokenData, process.env.JWT_key, {expiresIn: "90 days"});
        Email.sendVerifyAccount(nueva, contactoNuevo.get("correo_personal"), signupToken);

        return res.json({
            success:true,
            code: 200
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

let acceptVerification = async function(req, res){
    try{
        if(!req.query.token){
            return res.json({
                success: false,
                code: 400,
                error: "No se recibió una ficha"
            });
        }

        var decoded = jwt.verify(req.query.token, process.env.JWT_key);
        console.log(decoded);
        if(!decoded.persona_id){
            return res.json({
                success: false,
                code: 400,
                error: "No se recibió un id de persona"
            });
        }

        var toVerify = await Models.Persona.findOne({
            where: {
                persona_id: decoded.persona_id
            }
        });

        if(!toVerify){
            return res.json({
                success: false,
                code: 400,
                error: "No se encontró la persona"
            });
        }

        await toVerify.update({
            is_verified: true
        });

        return res.json({
            success: true,
            code: 200,
            resource: toVerify
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
