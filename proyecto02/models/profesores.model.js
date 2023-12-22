// Importa el módulo mongoose para interactuar con MongoDB y el objeto Schema para definir esquemas de datos.
const mongoose = require('mongoose');
const Schema =mongoose.Schema

// Define un esquema para los documentos de la colección "profesores" en MongoDB.
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
    profesor: {
        type: String,
        require: false,
    }
    });
    
    
    const Cursos =mongoose.model('cursos', cursosSchema);
    
    module.exports = Cursos;