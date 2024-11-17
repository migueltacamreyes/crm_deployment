const Pedidos = require("../models/Pedidos");


//Agregar Cliente
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje: 'Se agrego un nuevo Pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
    }
}


//Mostrar Pedido
exports.mostrarPedido = async (req, res, next) => {

    try {
        const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        if(!pedido){
            res.json({ mensaje: 'Ese Pedido no existe '});
            next();
        }
        
        res.json(pedido);
        
    } catch (error) {
        console.log(error);
        next()
    }

}

//Actualizar
exports.actualizarPedido = async (req, res, next) => {

    try {
        const pedido = await Pedidos.findByIdAndUpdate({ _id: req.params.idPedido}, req.body, {
            new: true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });;
    

        res.json(pedido);
        
    } catch (error) {
        console.log(error);
        next()
    }

}

//Eliminar Pedido por su Id
exports.eliminarPedido = async (req, res, next) => {

    try {
        const pedido = await Pedidos.findOneAndDelete({ _id: req.params.idPedido });
        
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.json({ mensaje: 'Pedido Eliminado' });
    } catch (error) {
        console.error('Error eliminando Pedido:', error.message);
        res.status(500).json({ error: 'Error eliminando el Pedido' });
    }

}