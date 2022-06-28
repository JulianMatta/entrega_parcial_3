const bcrypt = require("bcrypt");

function esPassWordValido(passwordEncriptado, password){
    return bcrypt.compareSync(password,passwordEncriptado);
}

function encriptarPassword(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10,null));
}

module.exports = {esPassWordValido, encriptarPassword};