const twilio = require("twilio");
const logger = require("../../logs/logger");


const cliente = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

async function enviarSms(destinatario, mensaje){
    try{
        const respuesta = await cliente.messages.create({
            from: "+19785103201",
            to: destinatario,
            body: mensaje

        });
        logger.getLogger().info(`mensaje enviado ${respuesta.body}}`);
    }
    catch(error){
        logger.getLogger("error").error(`error a enviar un sms ${error}`);
    }

}

async function enviarWhatsApp(destinatario, mensaje){
    try{
        const respuesta = await cliente.messages.create({
            from: "whatsapp:+14155238886",
            to: `whatsapp:${destinatario}`,
            body: mensaje,
            mediaUrl:[]

        });
        logger.getLogger().info(`whatsapp enviado ${respuesta.body}}`);
    }
    catch(error){
        logger.getLogger("error").error(`error a enviar un whatsapp ${error}`);
    }
}

module.exports = {enviarSms,enviarWhatsApp};