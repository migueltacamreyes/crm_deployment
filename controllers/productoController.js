
const Productos = require("../models/Productos");
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('Formato No Valido'))
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

//Subir Archivo

exports.subirarchivo = async (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            res.json({mensaje: error})
        }
        return next();
    })
}

//Agregar Producto
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({mensaje: 'Se agrego un nuevo Producto'})
    } catch (error) {
        console.log(error);
        next();
    }
}


//Mostrar Productos
exports.mostrarProductos = async (req, res, next) => {
    try {

        const productos = await Productos.find({});
        res.json(productos);
        
    } catch (error) {
        console.log(error);
        next()
    }
}


//Mostrar Producto
exports.mostrarProducto = async (req, res, next) => {

    try {
        const producto = await Productos.findById(req.params.idProducto);
        if(!producto){
            res.json({ mensaje: 'Ese Producto no existe '});
            next();
        }
        
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        next()
    }

}

//Actualizar
exports.actualizarProducto = async (req, res, next) => {

    try {

        const productoAnterior = await Productos.findById(req.params.idProducto);
        
        const nuevoProducto = req.body;

        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        const producto = await Productos.findByIdAndUpdate({ _id: req.params.idProducto}, nuevoProducto, {
            new: true
        });
        
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        next()
    }

}

//Eliminar Producto por su Id
exports.eliminarProducto = async (req, res, next) => {

    try {
        const producto = await Productos.findOneAndDelete({ _id: req.params.idProducto });
        
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto Eliminado' });
    } catch (error) {
        console.error('Error eliminando Producto:', error.message);
        res.status(500).json({ error: 'Error eliminando el Producto' });
    }

}

exports.buscarProducto = async (req, res, next) => {
    try {

        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') });
        res.json(producto);
        
    } catch (error) {
        console.log(error);
    }
}