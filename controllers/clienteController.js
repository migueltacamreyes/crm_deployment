const Clientes = require("../models/Clientes");


//Agregar Cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);
    try {
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'})
    } catch (error) {
        res.send(error);
        next();
    }
}


//Mostrar CLientes
exports.mostrarClientes = async (req, res, next) => {
    try {

        const clientes = await Clientes.find({});
        res.json(clientes);
        
    } catch (error) {
        console.log(error);
        next()
    }
}


//Mostrar Cliente
exports.mostrarCliente = async (req, res, next) => {

    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        if(!cliente){
            res.json({ mensaje: 'Ese Cliente no existe '});
            next();
        }
        
        res.json(cliente);
        
    } catch (error) {
        console.log(error);
        next()
    }

}
//Actualizar
exports.actualizarCliente = async (req, res, next) => {

    try {
        const cliente = await Clientes.findByIdAndUpdate({ _id: req.params.idCliente}, req.body, {
            new: true
        });
        
        res.json(cliente);
        
    } catch (error) {
        res.send(error);
        next()
    }

}

//Eliminar Cliente por su Id
exports.eliminarCliente = async (req, res, next) => {

    try {
        const cliente = await Clientes.findOneAndDelete({ _id: req.params.idCliente });
        
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        res.json({ mensaje: 'Cliente Eliminado' });
    } catch (error) {
        console.error('Error eliminando cliente:', error.message);
        res.status(500).json({ error: 'Error eliminando el cliente' });
    }

}