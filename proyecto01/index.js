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


// Conecta la aplicación a la base de datos de MongoDB.
mongoose.connect('mongodb+srv://manuma:sZIJnRZAz8s4fwJg@cluster0.hspjmtk.mongodb.net/academia',{
    //useNewUrlParser:true,
    //useUnifiedTopology:true,
})
  .then(() => console.log('Server Connected!'));



//BUENAS PRATICAS (GOOD PRACTICES)
//ARQUITECTURA LIMPIA (CLEAN ARCHITECTURE)

// Rutas de la aplicación

// Utiliza el enrutador de productos para manejar las rutas bajo '/alumnos' & '/productos'.
app.use('/alumnos',require('./routes/alumnos.routes'));
app.use('/cursos',require('./routes/cursos.routes'));

//es otra forma de importar el enrutador para manejar la ruta '/cursos' y '/alumnos'.
//app.use('/productos', productoRouter); 
//app.use('/alumnos',alumnosRouter);




// Inicia el servidor web en el puerto 3000.
app.listen(3000, ()=>{
  console.log ('Server listening on port 3000');
});


