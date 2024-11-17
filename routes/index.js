const express = require('express')
const router = express.Router();
const clienteController = require('../controllers/clienteController.js');
const productoController = require('../controllers/productoController.js');
const pedidoController = require('../controllers/pedidoController.js');
const usuarioController = require('../controllers/usuarioController.js');

//Proteger Rutas
const auth = require('../middleware/auth.js');

module.exports = function(){

     //Agregar POST
    router.post('/clientes', auth, clienteController.nuevoCliente);

    //Obenet datos
    router.get('/clientes', auth, clienteController.mostrarClientes);

    //Mostrar un Cliente ID
    router.get('/clientes/:idCliente', auth, clienteController.mostrarCliente);

    //Actualizar CLiente
    router.put('/clientes/:idCliente', auth, clienteController.actualizarCliente);

    //Eliminar Cliente
    router.delete('/clientes/:idCliente', auth, clienteController.eliminarCliente);

    /************ PRODUCTOS ***************/

    //Agregar POST
    router.post('/productos',
        auth,
        productoController.subirarchivo, 
        productoController.nuevoProducto);

    //Obenet datos
    router.get('/productos', auth, productoController.mostrarProductos);

    //Mostrar un Productos ID
    router.get('/productos/:idProducto', auth, productoController.mostrarProducto);

    //Actualizar Productos
    router.put('/productos/:idProducto', 
        auth,
        productoController.subirarchivo,
        productoController.actualizarProducto);

    //Eliminar Productos
    router.delete('/productos/:idProducto', auth, productoController.eliminarProducto);
    
    //BUscar Producto
    router.post('/productos/busqueda/:query', auth, productoController.buscarProducto);

        /*********PEDIDOS*********************/
    
    router.post('/pedidos', auth, pedidoController.nuevoPedido)
    
    //Mostrar LOs pedidos
    router.get('/pedidos', auth, pedidoController.mostrarPedidos);

    //Mostrar un Productos ID
    router.get('/pedidos/:idPedido', auth, pedidoController.mostrarPedido);

    //Actualizar Productos
    router.put('/pedidos/:idPedido',
        auth, 
        pedidoController.actualizarPedido);

    //Eliminar Productos
    router.delete('/pedidos/:idPedido', auth, pedidoController.eliminarPedido);


    ///USUARIOS
    router.post('/crear-cuenta', usuarioController.registrarUsuario);

    router.post('/iniciar-sesion', usuarioController.autenticarUsuario);

    return router;

    /*mongodb://localhost:27017/ */
}