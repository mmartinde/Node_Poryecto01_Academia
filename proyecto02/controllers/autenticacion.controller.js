// Importo JWT y bcryptjs
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Profesores = require('../models/profesores.model');

/**
 * Autentica a un profesor basándose en su nombre de usuario y contraseña.
 *
 * Esta función asincrónica realiza los siguientes pasos para autenticar a un usuario:
 *
 * 1. Busca al profesor en la base de datos utilizando el nombre de usuario proporcionado.
 * 2. Si encuentra un profesor con el nombre de usuario dado, procede a comparar la contraseña proporcionada
 *    con el hash almacenado en la base de datos usando bcrypt.
 * 3. Si la comparación es exitosa (lo que significa que las contraseñas coinciden),
 *    genera un token JWT que incluye el ID del profesor y su rol. Este token es firmado
 *    con una clave secreta y tiene una duración de 1 hora.
 * 4. Retorna el token JWT para ser utilizado en la autenticación de rutas protegidas.
 *
 * @param {string} usuario - El nombre de usuario del profesor que intenta autenticarse.
 * @param {string} password - La contraseña proporcionada por el profesor para la autenticación.
 *
 * @returns {Promise<string>} Una promesa que resuelve al token JWT si la autenticación es exitosa.
 * 
 * @throws {Error} Si la autenticación falla (ya sea porque el usuario no existe o la contraseña es incorrecta),
 *                 o si ocurre un error en el proceso de autenticación, se lanza un error.
 */
async function autenticarUsuario(usuario, password) {
    try {
        // encuentra el usuario por su usuario
        const profesor = await Profesores.findOne({usuario});
    
        // comprueba si el usuario existe y la contrasena es correcta
        if (profesor && bcrypt.compareSync(password, profesor.password)) {
            // genera y retorna un token con JWT que expira en 1 hora
            const token = jwt.sign({ profesorId: profesor._id, rol: profesor.rol }, process.env.CLAVE_SECRETA, {expiresIn: '1h'});
            
            return token;
        } else {
            throw new Error ('Autenticacion fallida');
        }

    } catch (error) {
        throw new Error('Error en el proceso de autenticacion');
    }
}