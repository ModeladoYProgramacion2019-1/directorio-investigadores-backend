const Models  = require('../../models/index');
const Op = Models.Sequelize.Op;

let CoreHelper = function(){
    this.isLikeSearch = isLikeSearch;
};

let isLikeSearch = function(input){
    console.log(input);
    return input.indexOf('%') == 0 && input.lastIndexOf('%') == input.length - 1;
}

exports.CoreHelper = new CoreHelper();
