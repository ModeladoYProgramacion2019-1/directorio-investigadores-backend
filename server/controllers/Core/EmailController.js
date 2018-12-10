const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

let Email = function(){
    this.send = send;
    this.sendVerifyAccount = sendVerifyAccount;
<<<<<<< HEAD
    this.sendAccountDeletion = sendAccountDeletion
=======
    this.sendResetPassword = sendResetPassword;
>>>>>>> 67dac9d8ec45846978755be7d8db5df19adbde3c
};

let send = function (data) {
    return new Promise(function (resolve, reject) {
        sgMail.setApiKey(process.env.sendgrid_key);
        if(data.from == null) data.from = "investigadores.soporte@gmail.com";
        console.log("send email");
        console.log(data);
        sgMail.send(data);
    });
};

let sendVerifyAccount = function(persona, email,token) {
    var pathToTemplate = path.join(__dirname, "..", "..", "Email Templates", "activate.html");
    var activateTemplate = fs.readFileSync(pathToTemplate).toString();
    activateTemplate = activateTemplate.replace(/{{URL}}/gm, process.env.frontend_url+"/verifica?token="+token);
    activateTemplate = activateTemplate.replace(/{{nombre}}/gm, persona.get("nombre"));
    activateTemplate = activateTemplate.replace(/{{apellido}}/gm, persona.get("apellido"));
    var data = {
        to: email,
        from: 'investigadores.soporte@gmail.com',
        subject: 'Activa tu cuenta',
        html: activateTemplate
    }
    send(data);
}

let sendAccountDeletion = function(persona, email, token){
    var pathToTemplate = path.join(__dirname, "..", "..", "Email Templates", "expire.html");
    var expireTemplate = fs.readFileSync(pathToTemplate).toString();
    expireTemplate = expireTemplate.replace(/{{URL}}/gm, process.env.frontend_url+"/activa?token="+token);
    expireTemplate = expireTemplate.replace(/{{nombre}}/gm, persona.get("nombre"));
    expireTemplate = expireTemplate.replace(/{{apellido}}/gm, persona.get("apellido"));
    var data = {
        to: email,
        from: 'investigadores.soporte@gmail.com',
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
        from: 'investigadores.soporte@gmail.com',
        subject: 'Solicitud de cambio de contraseña',
        html: resetTemplate
    }
    send(data)
}

>>>>>>> 67dac9d8ec45846978755be7d8db5df19adbde3c
exports.Email = new Email();
