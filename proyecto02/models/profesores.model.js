// Importa el módulo mongoose para interactuar con MongoDB y el objeto Schema para definir esquemas de datos.
const mongoose = require('mongoose');
const Schema =mongoose.Schema

// Define un esquema para los documentos de la colección "profesores" en MongoDB.
const ProfesoresSchema = new Schema({
    nombre:{
        type: String,
        require: true,
    },
    usuario:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    rol: {
        type: String,
        require: false,
    }
    });
    
    
    const Profesores =mongoose.model('profesores', ProfesoresSchema);
    
    module.exports = Profesores;