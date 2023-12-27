/**
 * Extrae los nombres de los campos de un esquema de Mongoose, para usarlos como campos de validacion.
 * @param {mongoose.Schema} esquema - El esquema de Mongoose del cual extraer los campos.
 * @returns {string[]} Lista de nombres de campos del esquema.
 */
 function extraerCamposDeEsquema(esquema) {
    // esquema.paths es un objeto donde las clases son los nombres de los campos definidos en el esquema de Monggoose
    // Object.keys es una funcion que toma un objeto como argumento y devuelve un array de todos los nombres d epropiedades de ese objeto (clases dentro del objeto)
  //  Object.keys(esquema.paths) devuelve un array de todos los nombres de las propiedades definidas en los schemas
    return Object.keys(esquema.paths).filter(key => !key.startsWith('_')); //extrae todos los nombres de campos definidos por los schemas de mongoose y los devuelve en forma de array, excluyendo los campos internos agregados por mongoose (_id, _v)
  }

//   exportacion de helper
  module.exports = { extraerCamposDeEsquema }