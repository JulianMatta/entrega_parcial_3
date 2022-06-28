const passport = require("passport");
const {Strategy:localStrategy} = require("passport-local");
const UsuariosDAO = require("../../dao/usuariosDAOMongoDb");
const { encriptarPassword, esPassWordValido } = require("../bcrypt/bcrypt");
const enviarCorreoElectronico = require("../nodemailer/nodemailer");
const mensajero = require("../twilio/twilio");
const gestorUsuario = new UsuariosDAO();



//config
//configuro passport, dentro obtiene los usuarios de la BD
passport.use("login", new localStrategy(async (username, password, done)=>{

    const usuarios = await gestorUsuario.getAllElementos();
    const usuario = usuarios.find(u=> u.username == username && esPassWordValido(u.password,password));
    if(usuario){
        return done(null, usuario);
    }
    
    return done(null,false);
}));

passport.use("alta", new localStrategy({ passReqToCallback: true },async (req,username, _password, done)=>{

    const usuarios = await gestorUsuario.getAllElementos();
    const usuarioAux = usuarios.find(u=> u.username == username);
    const {username:email,password,edad,direccion, nombre, codNacion,codArea,numTelefono} = req.body;
    const img = req.file.filename;
    if(usuarioAux || (email===undefined || password===undefined || edad===undefined || nombre===undefined || codNacion===undefined || codArea===undefined ||numTelefono === undefined )){
        return done(null,false);
    }
    
    const telefono =codNacion+"9"+codArea+numTelefono;
    const usuario ={username:email,password:encriptarPassword(password),edad,direccion,nombre,telefono,img};
    await gestorUsuario.addElementos(usuario);
    const plantillaBienvenida = `<section style="background-color: blanchedalmond;">
    <h1>Bienvenido ${nombre}</h1><br>
    <p>Usted se ha dado de alta de forma exitosa en la app de Alejandro Bongioanni</p><br>
    <ul>
        <li>Usuario: ${usuario.username}</li>
        <li>Nombre: ${usuario.nombre}</li>
        <li>Edad: ${usuario.edad}</li>
        <li>Direccion: ${usuario.direccion}</li>
        <li>Telefono: ${usuario.telefono}</li>
    </ul>
    </section>`;
    await enviarCorreoElectronico(username, `Bienvenido ${usuario.nombre}`, plantillaBienvenida);
    return done(null,usuario);
 }));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

module.exports= passport;