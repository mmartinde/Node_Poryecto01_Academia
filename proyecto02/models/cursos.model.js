// Importa el módulo mongoose para interactuar con MongoDB y el objeto Schema para definir esquemas de datos.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Alumnos = require('../models/alumnos.model');
const Profesores = require('../models/profesores.model');

// Define un esquema para los documentos de la colección "alumnos" en MongoDB.
const cursosSchema = new Schema({
nivel:{
    type: String,
    required: true,
},
dia:{
    type: String,
    required: true,
},
hora:{
    type: String,
    required: true,
},
aula: {
    type: String,
    required: false,
},
profesores_id: {
    type: Schema.Types.ObjectId,
    ref: Profesores, // Agregada relacion en Schema con profesores
    required: true, // Cambio de opcional a requerido, para que cada curso tenga un profesor asignado
},
// Relacion con schema Alumnos usando un array para crear la relacion bidireccional (alumnos y profesores). El array permite incluir la lista de alumnos cursando el curso
alumnos: [{
    type: Schema.Types.ObjectId,
    ref: Alumnos
}]
});


const Cursos = mongoose.model('cursos', cursosSchema);

module.exports = Cursos;