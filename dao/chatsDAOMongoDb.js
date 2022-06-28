const GestorDbMongo = require("../contenedores/gestorDbMongo");

const esquema = {

  name:{type:String, require:true, max:50}, 
  user:{type:String, require:true, max:50}, 
  message:{type:String, require:true}
}

module.exports = class ChatsDAOMongo extends GestorDbMongo{

    constructor(){
        super(process.env.STRING_CONNECTION,"chats",esquema);   
      }
}