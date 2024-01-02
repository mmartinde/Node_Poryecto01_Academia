// Importo bcrypt para realizar la encriptacion
const bcrypt = require('bcryptjs');


/**
 * Encripta una contraseña proporcionada usando bcryptjs.
 *
 * Esta función asincrónica realiza los siguientes pasos para encriptar una contraseña:
 *
 * 1. Genera un 'salt', que es una cadena de caracteres aleatorios, usando bcryptjs. El número '10'
 *    representa el número de rondas de generación de salt, y afecta directamente a la seguridad y
 *    al coste computacional del proceso.
 * 2. Una vez que se ha generado el salt, utiliza bcryptjs para hashear la contraseña junto con el salt.
 *    Este proceso transforma la contraseña en un formato seguro que puede ser almacenado en la base de datos.
 * 3. Retorna la contraseña hasheada.
 *
 * @param {string} password - La contraseña en texto plano que necesita ser encriptada.
 * @returns {Promise<string>} - Una promesa que resuelve en la contraseña hasheada.
 */
const encriptarPassword = async (password) => { //Funcion flecha para crear el helper (Por tiempo, se me hizo mas facil)
    const salt = await bcrypt.genSalt(10); // genera el 'salt' con un factor 10 (recomendado)
    return bcrypt.hash(password, salt); // toma la contrasena y el salt generado, y crea un hash. Este hash es el que debe guardarse en el campo 'password' del schema
};

function compararPassword(hash, password) {
    const resultado = bcrypt.compare(password, hash);
    return resultado;
}

module.exports = { encriptarPassword, compararPassword }

