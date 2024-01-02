//importar fichero .env con las claves de seguridad
require('dotenv').config();

// Importa el framework Express para crear la aplicación web.
const express = require("express");
const app = express();

// Importa el middleware bodyParser para procesar datos en las solicitudes.
var bodyParser = require("body-parser");

// Importa el enrutador de usuarios. -> es otro metodo de importar el enrutador
//const alumnosRouter = require('./routes/alumnos.routes');
//const cursosRouter = require('./routes/cursos.routes');

// Importa la biblioteca de mongoose para la conexión a MongoDB.
const mongoose = require('mongoose');

// Configura el middleware bodyParser para procesar datos en formato x-www-form-urlencoded y JSON.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Creación de la secret key (clave valor)
app.set("secretKey", process.env.JWTSECRET);

// Conecta la aplicación a la base de datos de MongoDB.
mongoose.connect(process.env.CONngit ECTIONSTRING,{
    //useNewUrlParser:true,
    //useUnifiedTopology:true,
})
  .then(() => console.log('Server Connected!'));



//BUENAS PRATICAS (GOOD PRACTICES)
//ARQUITECTURA LIMPIA (CLEAN ARCHITECTURE)

// Rutas de la aplicación

// Utiliza el enrutador de productos para manejar las rutas bajo '/alumnos' & '/productos' & '/profesores'.
app.use('/alumnos',require('./routes/alumnos.routes'));
app.use('/cursos',require('./routes/cursos.routes'));
app.use('/profesores',require('./routes/profesores.routes'));


// Inicia el servidor web en el puerto 3000.
app.listen(process.env.PORT, ()=>{
  console.log ('Server listening on port 3000');
});


