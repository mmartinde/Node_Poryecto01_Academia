//Importacion de helper 'validador de crear curso
const { validarCrearCurso } = require('../helpers/validadores');

// Middleware para validar la creacion de un curso
/**
 * Middleware para validar la creación de un curso.
 * Utiliza la función validarCrearCurso para comprobar si los campos enviados en la solicitud son válidos.
 * 
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función middleware siguiente en la pila de Express.
 * 
 * Si la validación falla, responde con un estado HTTP 400 y un mensaje de error.
 * Si la validación es exitosa, pasa el control al siguiente middleware o controlador.
 */
function validarCurso(req, res, next) {
    const resultado = validarCrearCurso(req.body);
    // Comprueba si el resultado de la validación es inválido.
    if(!resultado.valido) {
        // Si la validación falla, envía una respuesta HTTP con estado 400 y el mensaje de error.
        return res.status(400).json({ msg: resultado.mensaje });
    }
    // Si la validación es exitosa, pasa el control al siguiente middleware.
    next();
}

module.exports = { validarCurso }