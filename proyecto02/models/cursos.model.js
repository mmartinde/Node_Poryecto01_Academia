// Importa el módulo mongoose para interactuar con MongoDB y el objeto Schema para definir esquemas de datos.
const mongoose = require('mongoose');
<<<<<<< HEAD:proyecto02/models/cursos.mode.js
const Schema =mongoose.Schema
=======

const Schema = mongoose.Schema
>>>>>>> f92376785f9ae7f3c63a1c81212477b079453bed:proyecto02/models/cursos.model.js

// Define un esquema para los documentos de la colección "alumnos" en MongoDB.
const cursosSchema = new Schema({
nivel:{
    type: String,
    require: true,
},
dia:{
    type: String,
    require: true,
},
hora:{
    type: String,
    require: true,
},
aula: {
    type: String,
    require: false,
},
profesor_id: {
    type: Schema.Types.ObjectId, 
    ref: "Profesores" // Agregada relacion en Schema con profesores
    require: true, // Cambio de opcional a requerido, para que cada curso tenga un profesor asignado
}
});


const Cursos =mongoose.model('cursos', cursosSchema);

module.exports = Cursos;