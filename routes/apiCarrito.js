const express = require("express");
const router = express.Router();
const CarritoController = require("../controllers/carritoController");
const mdw = require("../middlewares/middlewares");

router.get("",mdw.validarSession, async (req, res)=>{
    const respuesta = await CarritoController.obtenerCarritoDeUnUsuario(req.session.passport.user.username);
    req.app.io.sockets.emit("refresh-carrito",{carrito:respuesta.carrito});
    res.status(respuesta.code).json(respuesta);
});

router.post("",mdw.validarSession, async (req, res)=>{
    const producto = req.body;
    const respuesta = await CarritoController.agregarProductoAlCarrito(req.session.passport.user.username, producto);
    req.app.io.sockets.emit("refresh-carrito",{carrito:respuesta.carrito});
    res.status(respuesta.code).json(respuesta);

});

router.post("/:id/comprar",mdw.validarSession, async (req, res)=>{
    let {id}=req.params;
    const respuesta = await CarritoController.procesaCompraDeUnCarrito(id, req.session.passport.user);
    req.app.io.sockets.emit("refresh-carrito",{carrito:{productos:[]}});
    res.status(respuesta.code).json(respuesta);
});


router.get("/:id/productos",mdw.validarSession, async (req, res)=>{
    let {id}=req.params;
    const respuesta = await CarritoController.obtenerProductosDeUnCarrito(id);
    req.app.io.sockets.emit("refresh-carrito",{carrito:respuesta.carrito});
    res.status(respuesta.code).json(respuesta);

});
router.post("/:id/productos",mdw.validarSession,async (req, res)=>{

    let {id}=req.params;
    const objeto = req.body;
    const respuesta = await CarritoController.actualizarProductosDeUnCarrito(id, {username:req.session.passport.user.username,productos:objeto});
    req.app.io.sockets.emit("refresh-carrito",{carrito:respuesta.carrito});
    res.status(respuesta.code).json(respuesta);

});
router.delete("/:idCarrito/productos/:idProducto",mdw.validarSession,async (req, res)=>{

    let {idCarrito,idProducto}=req.params;
    const respuesta  = await CarritoController.borraUnProductoDeUnCarrito(idCarrito, idProducto,req.session.passport.user.username);
    req.app.io.sockets.emit("refresh-carrito",{carrito:respuesta.carrito});
    res.status(respuesta.code).json(respuesta);
});


module.exports = router;