const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

let Email = function(){
    this.send = send;
    this.sendVerifyAccount = sendVerifyAccount
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
    var data = {
        to: email,
        from: 'investigadores.soporte@gmail.com',
        subject: 'Activa tu cuenta',
        html: activateTemplate
    }
    send(data);
}

exports.Email = new Email();
