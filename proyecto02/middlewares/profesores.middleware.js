const jwt = require('jsonwebtoken');
const { validarCrearProfesor } = require("../helpers/validadores");


// Middleware para validar la creacion de un profesor
function  validarProfesor (req, res, next){
  // Llama a la funcion validarCrearProfesor (importada desde helpers) pasando los datos del cuerpo a la solicitud
    const resultadoValidacion = validarCrearProfesor(req.body);
    if (resultadoValidacion.valido){
      //  Si los datos son validos, pasa el control al siguiente middleware en la cadena
      next();// Next termina el middleware pasando control al proximo.
  }else{
    res.status(400).json({ msg: resultadoValidacion.mensaje });
  }
  }

  /**
 * Middleware para validar el rol de un usuario en base a un token JWT.
 *
 * Esta función verifica el token proporcionado en la consulta (query) de la solicitud HTTP.
 * Después de verificar el token, comprueba si el usuario tiene el rol requerido ('profesor') para acceder a la ruta.
 *
 * @param {Object} req - El objeto de solicitud Express. Se espera que contenga el token JWT en req.query.token.
 * @param {Object} res - El objeto de respuesta Express. Se utiliza para enviar una respuesta en caso de error o acceso denegado.
 * @param {Function} next - Una función callback de Express que se llama para pasar el control al siguiente middleware en la cadena.
 *
 * @throws {Error} - Lanza un error y envía una respuesta con estado HTTP 401 si la autenticación falla o el token no es válido.
 * @throws {Error} - Lanza un error y envía una respuesta con estado HTTP 403 si el rol del usuario no es 'profesor'.
 */
  function validarRol(req, res, next) {
    if (req.query.token) {
      try{
        const resultado = jwt.verify(req.query.token, process.env.JWTSECRET);
        if (resultado.rol === 'prof') {
          next();
        } else {
          return res.status(403).json({ msg: 'Acceso denegado: se requiere rol de profesor' });
        }
      } catch (error) {
        console.log('error:', error)
        return res.status(401). json({ msg: 'Autenticacion fallida o token no valido' });
      }
    }
  }

    
  module.exports ={
    validarProfesor,
    validarRol
  }
