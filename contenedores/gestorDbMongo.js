const mongoose = require("mongoose");
const logger = require("../logs/logger");
module.exports = class GestorDbMongo{

    #coleccion;
    #esquema;
    #modelo;
    #cadenaConexion;
    constructor(cadenaConexion,coleccion,esquema){
        this.#cadenaConexion = cadenaConexion;
        this.#coleccion = coleccion;
        this.#esquema= new mongoose.Schema(esquema);
        this.#modelo= mongoose.model(this.#coleccion,this.#esquema);
    }

    async #setConexion(){
        try{
            await mongoose.connect(this.#cadenaConexion);
            logger.getLogger().info(`conexion a mongo establecida`);
        }
        catch(error){
            logger.getLogger("error").error(error);
        }

    }

    async addElementos(elementos){
        try{
            this.#setConexion();
            const respuesta = await this.#modelo.insertMany(elementos);
            logger.getLogger().info(`Se agregaron los elementos`);
            return respuesta;
        }
        catch(error){
            logger.getLogger("error").error(`${error}`);
        }
    }

    async getAllElementos()
    {

        try{
            this.#setConexion();
            return this.#modelo.find();
        }
        catch(error){
            logger.getLogger("error").error(`${error}`);
        }
    }

    async getElementoById(id){
        try{
            this.#setConexion();
            return this.#modelo.findById(id);
        }
        catch(error){
            logger.getLogger("error").error(`${error}`);
        }

    }
    async updateElemento(id,objeto)
    {
        try{
            this.#setConexion();
            await this.#modelo.findByIdAndUpdate(id,objeto);
        }
        catch(error){
            logger.getLogger("error").error(`${error}`);
        }
        return this.getAllElementos();

    }
    async deleteElementoById(id)
    {
        try{
            this.#setConexion();
            await this.#modelo.findByIdAndDelete(id);
        }
        catch(error){
            logger.getLogger("error").error(`${error}`);
        }
        return this.getAllElementos();
    }

}

