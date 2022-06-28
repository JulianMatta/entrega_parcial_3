const GestorDbMongo = require("../contenedores/gestorDbMongo");

const esquema = {
  username: {type:String, require:true,max:255},
  productos:{type:Array, require:true},
}

module.exports = class CarritoDAOMongo extends GestorDbMongo{

      constructor(){
        super(process.env.STRING_CONNECTION,"carrito",esquema);   
      }
}