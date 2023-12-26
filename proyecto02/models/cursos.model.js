// Importa el módulo mongoose para interactuar con MongoDB y el objeto Schema para definir esquemas de datos.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
},
// Relacion con schema Alumnos usando un array para crear la relacion bidireccional (alumnos y profesores). El array permite incluir la lista de alumnos cursando el curso
alumnos: [{
    type: Schema.Types.ObjectId,
    ref: 'Alumnos'
}]
});


const Cursos =mongoose.model('cursos', cursosSchema);

module.exports = Cursos;