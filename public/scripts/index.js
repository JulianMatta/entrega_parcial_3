import { getDatosFetch, postDatosFetch, deleteDatosFetch } from "./modules/fetch.js";
import { renderObjetos } from "./modules/render.js";


const socket = io();
const sectionProductos = document.querySelector("#section-productos");
const sectionCarrito = document.querySelector("#section-carrito");
const productos = [];
const productosCarrito = [];
let carrito;


socket.on("refresh-carrito",(data)=>{
    productosCarrito.splice(0, productosCarrito.length);
    productosCarrito.push(...data.carrito.productos);
    carrito = data.carrito;
    renderObjetos(sectionCarrito,mapearProductosDelCarrito(productosCarrito),"Eliminar","Carrito");
    if(productosCarrito.length>0){
        document.querySelectorAll(".btn-Eliminar").forEach(btn => btn.addEventListener("click", handlerEliminarProducto));
        document.querySelector("#btn-procesar-compra").addEventListener("click", handlerProcesarCompra);
    }

});


window.addEventListener("DOMContentLoaded",async ()=>{

    try{
        const res = await getDatosFetch("/api/productos-test");
        actualizarProductos(res.productosFaker);
        await getDatosFetch("/api/carrito");
    }
    catch(error){
        console.error(error);
    }
});



const handlerComprarProducto = async (event)=>{

    const productoComprado = productos.find(p=> p.id === event.target.parentNode.parentNode.dataset.id);
    try{
        productoComprado.cantidad = 1;
        await postDatosFetch("/api/carrito", productoComprado);
    }
    catch(error){
        console.error(error);
    }

}

function mapearProductosDelCarrito(elementos){
    return elementos.map(p=> {return {id:p.id,urlImg:p.urlImg,cantidad:p.cantidad,precio:p.precio, nombre:p.nombre}});
}

const handlerEliminarProducto = async (event)=>{
    const producto = productosCarrito.find(p=> p.id === event.target.parentNode.parentNode.dataset.id);
    if(producto){
        if((producto.cantidad-1) === 0){
            const res = await  deleteDatosFetch(`/api/carrito/${carrito._id}/productos/${producto.id}`);
            console.log(res);
        }
        else{
            producto.cantidad--;
            const productosAux = productosCarrito.filter(p=> p.id !== producto.id );
            productosAux.push(producto);
            const res = await postDatosFetch(`/api/carrito/${carrito._id}/productos`,productosAux);
            console.log(res);
        }
    }

}


const handlerProcesarCompra = async (_event)=>{
    
    if(confirm("Desea enviar el pedido?")){
        const res = await postDatosFetch(`/api/carrito/${carrito._id}/comprar`);
        console.log(res);
        alert("compra procesada");
    }
}

function actualizarProductos(elementos){
    productos.splice(0, productos.length);
    productos.push(...elementos);
    renderObjetos(sectionProductos,productos,"Comprar","Productos");
    document.querySelectorAll(".btn-Comprar").forEach(btn => btn.addEventListener("click", handlerComprarProducto));
}


