const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
var Email = require("../Core/EmailController").Email;
var jwt = require("jsonwebtoken");

let CoreHelper = function(){
    this.isLikeSearch = isLikeSearch;
    this.sendDeletionNotice = sendDeletionNotice;
    this.deleteNonRegisteredUsers = deleteNonRegisteredUsers
};

let isLikeSearch = function(input){
    console.log(input);
    return input.indexOf('%') == 0 && input.lastIndexOf('%') == input.length - 1;
}

/** Sends an email notice to non-registered users two days before we delete their information 
**/
let sendDeletionNotice = function(){
    Models.sequelize.query("SELECT Contacto.correo_personal, Persona.nombre, Persona.apellido, Persona.persona_id FROM Contacto "
        + " INNER JOIN Persona ON Contacto.contacto_id=Persona.contacto_id "
        + " AND is_verified = false AND "
        + " DATEDIFF(NOW(), Persona.createdAt) >= "+ parseInt(Number(process.env.verification_time)- 2) 
        + " AND DATEDIFF(NOW(), Persona.createdAt) < " + parseInt(Number(process.env.verification_time)- 1) + ";").spread((results, metadata) => {
        console.log(results);
        // Sending deletion notice to unregistered users
        for(i = 0; i < results.length; i++){
            var tokenData = {
                nombre: results[i].nombre,
                apellido: results[i].apellido,
                correo_personal: results[i].correo_personal,
                persona_id: results[i].persona_id
            }
            var jwtToken = jwt.sign(tokenData, process.env.JWT_key, {expiresIn: "2 days"});
            Email.sendAccountDeletion(tokenData, results[i].correo_personal, jwtToken);
        }
    });
}

/** Deletes non-registered users from the database 
after they exceed the registration time
**/

let deleteNonRegisteredUsers = function(){
    Models.sequelize.query("SELECT contacto_id FROM Persona WHERE datediff(createdAt, now())>= "
    + process.env.verification_time + " AND is_verified = false;").spread((results, metadata) => {
        for(i = 0; i < results.length; i++){
            Models.sequelize.query("delete from Persona where contacto_id = " + 
            results[i].contacto_id+ ";").spread((results, metadata) =>{});
            Models.sequelize.query("delete from Contacto where contacto_id = " + 
            results[i].contacto_id+ ";").spread((results, metadata) =>{});
        }
    });
}
exports.CoreHelper = new CoreHelper();
