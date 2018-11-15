const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;
const CoreHelper = require('../Helpers/CoreHelper').CoreHelper;
var jwt = require('jsonwebtoken');

let Authentication = function(){
    this.signUp = signUp;
}

let signUp = async function(req, res){
    try{
        if(!req.query.token){
            return({
                res.json({
                    success: false,
                    code: 400
                    error: "Missing token"
                });
            });
        }
        var decoded = jwt.verify(req.query.token, process.env.JWT_key);
        //TODO: send email to user
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
