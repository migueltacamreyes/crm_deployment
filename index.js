const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: './variables.env'});


//CORS permite que un cliente se conecte al servidor para el intercambio de recursos
const cors = require('cors');

//Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Definir un dominio para recibir peticiones
const whitelist = [process.env.FRONTEND_URL, 'http://localhost:5000'];
const corsOption ={
    origin: (origin, callback) => {
        console.log(origin);
        const existe = whitelist.some( dominio => dominio === origin);
        if(existe || !origin){
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

//Habilitar CORS
app.use(cors(corsOption));

app.use('/', routes());
//carpeta úbloca
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;


app.listen(port, host, () => {
    console.log('El servidro esta funcionando');
});
