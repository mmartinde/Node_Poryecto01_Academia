// Importo JWT y bcryptjs
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Profesores = require('../models/profesores.model');
const { compararPassword } = require('../helpers/encriptador');

// /**
//  * Autentica a un profesor basándose en su nombre de usuario y contraseña.
//  *
//  * Esta función asincrónica realiza los siguientes pasos para autenticar a un usuario:
//  *
//  * 1. Busca al profesor en la base de datos utilizando el nombre de usuario proporcionado.
//  * 2. Si encuentra un profesor con el nombre de usuario dado, procede a comparar la contraseña proporcionada
//  *    con el hash almacenado en la base de datos usando bcrypt.
//  * 3. Si la comparación es exitosa (lo que significa que las contraseñas coinciden),
//  *    genera un token JWT que incluye el ID del profesor y su rol. Este token es firmado
//  *    con una clave secreta ('CLAVE_SECRETA') y tiene una duración de 1 hora.
//  * 4. Retorna el token JWT para ser utilizado en la autenticación de rutas protegidas.
//  *
//  * @param {Object} datosUsuario - Objeto que contiene el nombre de usuario y la contraseña del profesor.
//  * @param {string} datosUsuario.usuario - El nombre de usuario del profesor.
//  * @param {string} datosUsuario.password - La contraseña proporcionada por el profesor.
//  * @returns {Promise<string>} Una promesa que resuelve al token JWT si la autenticación es exitosa.
//  * @throws {Error} Si la autenticación falla (ya sea porque el usuario no existe o la contraseña es incorrecta),
//  *                 o si ocurre un error en el proceso de autenticación, se lanza un error.
//  */
// async function autenticarUsuario(datosUsuario) {
//     const { usuario, password } = datosUsuario
//     try {
//         // encuentra el profesor por su usuario
//         const profesor = await Profesores.findOne({usuario});
    
//         // comprueba si el profesor existe y la contrasena es correcta
//         if (profesor && bcrypt.compare(password, profesor.password)) {
//             // genera y retorna un token con JWT que expira en 1 hora
//             const token = jwt.sign({ profesorId: profesor._id, rol: profesor.rol }, process.env.CLAVE_SECRETA, {expiresIn: '1h'});
            
//             return token;
//         } else {
//             throw new Error ('Autenticacion fallida');
//         }
        
//     } catch (error) {
//         throw new Error('Error en el proceso de autenticacion');
//     }
// }

// async function login(datosUsuario) {
//     const { usuario, password } = datosUsuario
//     const usuarioEncontrado = await Profesores.findOne({ usuario });

//     if (usuarioEncontrado) {
//         resultadoComparacion = await compararPassword(usuarioEncontrado.password, password);
//         if (resultadoComparacion) {
//             const token = jwt.sign( { id: usuarioEncontrado._id, usuario: usuarioEncontrado.usuario }, process.env.CLAVE_SECRETA, {expiresIn: '1h'});
//             return {
//                 usuario: usuarioEncontrado,
//                 token: token,
//                 msg: null
//             }
//         } else {
//             return {
//                 usuario: null,
//                 token: null,
//                 msg: 'password incorrecto'
//             }
//         }
//         } else {
//             return {
//                 usuario: null,
//                 token: null,
//                 msg: 'email no encontrado'
//             }
//     }
// }

function estaLoggeado(req, res, next) {
    if (req.query.token) {
        try{
            const resultado = jwt.verify(req.query.token, process.env.JWTSECRET);
            if(resultado.id === req.params.id){
                next();
            } else {
                res.status(403).json({msg: 'no tienes permiso paraacceder a este recurso'});
            }
        } catch (error) {
            res.status(401).json({msg: 'token no valido'});
        }
    } else {
        res.status(400).json({msg: 'no has proporcionado un token'})
    }
}

module.exports = { estaLoggeado }