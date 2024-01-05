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
function estaLoggeado(req, res, next) {
    if (req.query.token) {
        try{
            const resultado = jwt.verify(req.query.token, process.env.JWTSECRET);
            if(resultado.id === req.params.id){
                next();
            } else {
                res.status(403).json({msg: 'no tienes permiso para acceder a este recurso'});
            }
        } catch (error) {
            res.status(401).json({msg: 'token no valido'});
        }
    } else {
        res.status(400).json({msg: 'no has proporcionado un token'})
    }
}

module.exports = { estaLoggeado }