const GestorDbMongo = require("../contenedores/gestorDbMongo");

const esquema = {

  username:{type:String, require:true, max:50}, 
  password:{type:String, require:true, max:50},
  img:{type:String, require:true, max:255},
  nombre:{type:String, require:true, max:50}, 
  direccion:{type:String, require:true, max:50},
  edad:{type:Number, require:true}, 
  telefono:{type:String, require:true, max:50},

}

module.exports = class UsuariosDAOMongo extends GestorDbMongo{

    constructor(){
        super(process.env.STRING_CONNECTION,"usuarios",esquema);   
      }
}