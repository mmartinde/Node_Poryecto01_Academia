// Importacion de helper 'validador de crear alumno'
const { validarCrearAlumno } = require("../helpers/validadores");


// Middleware para validar la creacion de un alumno
function validarAlumno(req, res, next) {
    // Llama a la funcion validarCrearAlumno (importada desde helpers) pasando los datos del cuerpo a la solicitud
    const resultado = validarCrearAlumno(req.body);
    // verifica si el resultado de la validacion es valido
    if(!resultado.valido) {
        // si los datos no son validos, envia una respuesta HTTP con codigo 400 (Solicitud incorrecta) e incluye un mensaje de error
        return res.status(400).json({ msg: resultado.mensaje });
    }
    //  Si los datos son validos, pasa el control al siguiente middleware en la cadena
    next(); // Next termina el middleware pasando control al proximo.
}

// Exporto el middleware
module.exports = { validarAlumno }