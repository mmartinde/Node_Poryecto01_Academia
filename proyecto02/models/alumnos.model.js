// Importa el módulo mongoose para interactuar con MongoDB y el objeto Schema para definir esquemas de datos.
const mongoose = require('mongoose');
const Schema =mongoose.Schema;


// Define un esquema para los documentos de la colección "alumnos" en MongoDB.
const alumnoSchema = new Schema({
nombre:{
    type: String,
    required: true,
},
apellidos:{
    type: String,
    required: true,
},
nombreTutor:{
    type: String,
    required: true,
},
dniTutor:{
    type: String,
    required: true,
},
formaDePago:{
    type: String,
    required: true,
},
datosBancarios:{
    type: String,
    required: false,
},
email:{
    type: String,
    required: true,
},
telefono:{
    type: String,
    required: true,
},
curso_id:{
    type: String,
    required: false,
},

})

// Crea un modelo llamado "Alumnos" utilizando el esquema definido.
const Alumnos = mongoose.model('alumnos', alumnoSchema)

// Exporta el modelo para poder utilizarlo en alumnos.controller.js
module.exports = Alumnos;