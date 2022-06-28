const createTransport = require("nodemailer");
const logger = require("../../logs/logger");
const transporter = createTransport.createTransport({
    service:"gmail",
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
});


async function enviarCorreoElectronico(usuario,asunto, mensajeHtml){
    try{
        const info = await transporter.sendMail({
            from:process.env.EMAIL,
            to:usuario,
            subject:asunto,
            html:mensajeHtml
        });
        logger.getLogger().info(`mail enviado ${info}}`);

    }
    catch(error){
        logger.getLogger("error").error(`error al enviar un mail ${error}`);
    }
}

module.exports = enviarCorreoElectronico;

