// Importa el módulo mongoose para interactuar con MongoDB y el objeto Schema para definir esquemas de datos.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cursos = require("./cursos.model");

// Define un esquema para los documentos de la colección "alumnos" en MongoDB.
const alumnoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  nombreTutor: {
    type: String,
    required: true,
  },
  dniTutor: {
    type: String,
    required: true,
  },
  formaDePago: {
    type: String,
    required: true,
  },
  datosBancarios: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  cursos: {
    type: Schema.Types.ObjectId, // Modifico el tipo para indicar que es una relacion con otro esquema
    ref: 'Cursos', // Referencia al nombre del modelo de cursos (cursos.model.js, lo define como Cursos en modulo de exportacion)
    required: false,
  },
});

// Crea un modelo llamado "Alumnos" utilizando el esquema definido.
const Alumnos = mongoose.model("alumnos", alumnoSchema);

// Exporta el modelo para poder utilizarlo en alumnos.controller.js
module.exports = Alumnos;
