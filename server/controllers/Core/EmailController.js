const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');
const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;

let Email = function(){
    this.send = send;
    this.sendVerifyAccount = sendVerifyAccount;
    this.sendAccountDeletion = sendAccountDeletion;
    this.sendResetPassword = sendResetPassword;
    this.sendAccountUpgrade = sendAccountUpgrade;
};

let send = function (data) {
    return new Promise(function (resolve, reject) {
        sgMail.setApiKey(process.env.sendgrid_key);
        if(data.from == null) data.from = "investigadores.soporte@gmail.com";
        console.log("sending email");
        sgMail.send(data);
    });
};

let sendVerifyAccount = function(persona, email, token) {
    var pathToTemplate = path.join(__dirname, "..", "..", "Email Templates", "activate.html");
    var activateTemplate = fs.readFileSync(pathToTemplate).toString();
    activateTemplate = activateTemplate.replace(/{{URL}}/gm, process.env.frontend_url+"/verifica?token="+token);
    activateTemplate = activateTemplate.replace(/{{nombre}}/gm, persona.get("nombre"));
    activateTemplate = activateTemplate.replace(/{{apellido}}/gm, persona.get("apellido"));
    var data = {
        to: email,
        from: process.env.main_admin_email,
        subject: 'Activa tu cuenta',
        html: activateTemplate
    }
    send(data);
}

let sendAccountDeletion = function(persona, email, token){
    var pathToTemplate = path.join(__dirname, "..", "..", "Email Templates", "expire.html");
    var expireTemplate = fs.readFileSync(pathToTemplate).toString();
    expireTemplate = expireTemplate.replace(/{{URL}}/gm, process.env.frontend_url+"/activa?token="+token);
    expireTemplate = expireTemplate.replace(/{{nombre}}/gm, persona.nombre);
    expireTemplate = expireTemplate.replace(/{{apellido}}/gm, persona.apellido);
    var data = {
        to: email,
        from: process.env.main_admin_email,
        subject: 'Activa tu cuenta o sera eliminada',
        html: expireTemplate
    }
    send(data)
}

let sendResetPassword = function(persona, email, token){
    var pathToTemplate = path.join(__dirname, "..", "..", "Email Templates", "reset.html");
    var resetTemplate = fs.readFileSync(pathToTemplate).toString();
    resetTemplate = resetTemplate.replace(/{{URL}}/gm, process.env.frontend_url+"/verifica?token="+token);
    resetTemplate = resetTemplate.replace(/{{nombre}}/gm, persona.get("nombre"));
    resetTemplate = resetTemplate.replace(/{{apellido}}/gm, persona.get("apellido"));
    var data = {
        to: email,
        from: process.env.main_admin_email,
        subject: 'Solicitud de cambio de contraseña',
        html: resetTemplate
    }
    send(data)
}

let sendAccountUpgrade = async function(req, res){
    try{
        console.log("SENDING UPGRADE");
        if(!req.body.type || !req.body.persona_id || !req.body.token){
            console.log("incomplete");
            console.log(req.body);
            return res.json({
                success: false,
                code: 400,
                error: "Parametros incompletos"
            });
        }
        console.log(req.body);
        var persona = await Models.Persona.findOne({
            where:{
                persona_id: req.body.persona_id
            }
        });
        if(!persona){
            console.log("NO PERSON")
            return res.json({
                success: false,
                code: 400,
                error: "Persona no encontrada"
            });
        }
        console.log(persona)
        var token = req.body.token;
        var type = req.body.type;
        console.log(token+" "+type)
        if(type == "administrador" || type == "investigador" || type == "estudiante"){
            console.log("VALID TYPE")
            var pathToTemplate = path.join(__dirname, "..", "..", "Email Templates", "upgrade.html");
            var upgradeTemplate = fs.readFileSync(pathToTemplate).toString();
            upgradeTemplate = upgradeTemplate.replace(/{{URL}}/gm, process.env.frontend_url+"/verifica/"+type+"?token="+token);
            upgradeTemplate = upgradeTemplate.replace(/{{nombre}}/gm, persona.get("nombre"));
            upgradeTemplate = upgradeTemplate.replace(/{{apellido}}/gm, persona.get("apellido"));
            upgradeTemplate = upgradeTemplate.replace(/{{type}}/gm, type);

            var data = {}
            switch (type) {
              case "administrador":
                  console.log("ADMIN")
                  data = {
                      to: process.env.main_admin_email,
                      from: process.env.main_admin_email,
                      subject: 'Solicitud de nuevo administrador',
                      html: upgradeTemplate
                  }
                  send(data);
                  break;

              case "investigador":
                  console.log("RESEARCH")
                  var admins = await Models.Persona.findAll({
                      include: [
                        {model: Models.Contacto},
                        {
                          model: Models.Administrador,
                          where: {
                              administrador_id: {[Op.not]: null}
                          }
                        }
                      ]

                  });
                  for(var i=0; i<admins.length; i++){
                      data = {
                          to: admins[i].Contacto.correo_personal,
                          from: process.env.main_admin_email,
                          subject: 'Solicitud de nuevo investigador',
                          html: upgradeTemplate
                      }
                      send(data);
                  }
                  break;

              case "estudiante":
                  console.log("STUDENT")
                  var investigador = await Models.Investigador.findOne({
                      where: {
                          investigador_id: req.body.investigador_id
                      },
                      include: [{
                        model: Models.Persona,
                        include: [{model: Models.Contacto}]
                      }]
                  });
                  data = {
                      to: investigador.Persona.Contacto.correo_personal,
                      from: process.env.main_admin_email,
                      subject: 'Solicitud de nuevo estudiante',
                      html: upgradeTemplate
                  }
                  send(data);
                  break;
            }
            return res.json({
                success: true,
                code: 200
            });
        }else{
            console.log("invalid")
            return res.json({
                success: false,
                code: 400,
                error: "Tipo invalido"
            });
        }
    }catch(error){
        console.log(error);
        return res.json({
            success: false,
            code: 500,
            error: error.toString()
        });
    }
}

exports.Email = new Email();
