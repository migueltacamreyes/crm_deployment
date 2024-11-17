const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.registrarUsuario = async (req, res) => {
    //Leer los datos del usuario
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje: 'Usuario Creado Correctamente'});

    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'})
    }

}

exports.autenticarUsuario = async (req, res, next) => {
    //Buscar Usuario
    const {email, password} = req.body;
    const usuario = await Usuarios.findOne( { email });

    if(!usuario){
        //NO existe
        await res.status(401).json({mensaje: 'Ese usuario no existe'});
        next();
    }else{
        //Si existe
        if(!bcrypt.compareSync(password, usuario.password)){
            //Si el passo es incorrecto
            await res.status(401).json({mensaje: 'El password Incorrecto'});
            next();
        }else{
            //Password COrrecto
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                _id: usuario._id
            }, 'LLAVESECRETA', {expiresIn: '1h'});

            //Retornar Tocken

            res.json({token});


        }

    }
}
