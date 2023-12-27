// Importacion de helper para obtener campos validos
const { extraerCamposDeEsquema } = require('../helpers/validadores');

/**
 * Middleware para validar los campos de una solicitud PATCH (reusable en cualquier ruta de la app).
 * @param {mongoose.Model} modelo - El modelo de Mongoose para el cual validar.
 * @returns {Function} El middleware de validación.
 */
function validarCamposPatch(modelo) {
    // variable que contiene los campos validos para que el middleware permita en solicitudes patch
    const camposValidos = extraerCamposDeEsquema(modelo.schema); //llama a la funcion del helper y guarda los nombres de los campos extraidos del esquema en la variable

    // Creo el middleware, y lo devuelvo como resultado de la funcion
    return function(req, res, next) {
        const camposSolicitud = Object.keys(req.body); // Object.keys es una funcion que toma un objeto como argumento y devuelve un array de todos los nombres de propiedades del objeto.

        for (let campo of camposSolicitud) { //Tomo el array creado por Object.keys e itero sobre cada elemento (campo que se quiere modificar en la solicitud)
            if (!camposValidos.includes(campo)) { //Si el campo valido (que se quiere modificar) NO incluye el campo de la solicitud muestra error
                
                return res.status(400).json({ msg: `Campo no valido: ${campo}` }); //mensaje de error y codigo 400 (error del usuario/cliente)
            }
        };
        
        next();
    }

}

// exportar middleware
module.exports = { validarCamposPatch };