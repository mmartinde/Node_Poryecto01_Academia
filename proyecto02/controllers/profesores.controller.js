// Importa el modelo "Profesores" que representa la colección de profesores en MongoDB.
const Profesor = require("../models/profesores.model");

//Cargar la seguridad para rutas privadas
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Busca y devuelve todos los profesores.
 * @returns {Promise<Array>} Un array que contiene todos los profesores.
*/
async function buscarTodos() {
  try{
    const profesores = await Profesor.find();
    return profesores;
  } catch (error){
    throw new Error('Error al buscar lista de profesores')
  }
}

/**
 * Busca un profesor por su ID.
 *
 * Esta función realiza una búsqueda en la base de datos para encontrar un profesor específico
 * utilizando su ID como parámetro.
 * @param {String} id El ID del profesor que se desea buscar.
 * @returns {Object|Null} Retorna el objeto del profesor si se encuentra, o null si el profesor no existe.
 */
async function buscarPorId(id) {
  try{
    const profesorEncontrado = await Profesor.findById(id);
    return profesorEncontrado;
  } catch(error){
    throw new Error('Error al buscar profesor por ID');
  }
}
/**
 * Crea un nuevo profesor.
 *
 * Esta función crea un nuevo registro de profesor en la base de datos con los datos proporcionados.
 * @param {String} nom Nombre del profesor.
 * @param {String} usu Nombre de usuario para cceder a la ruta privada.
 * @param {String} pss Password para el acceso a rutas privada.
 * @param {String} rol Rol que desenpeñara el profesor en la ruta privada.
 */
async function crearProfesor(nom, usu, pss, rol) {
  try{
    const nuevoProfesor = new Profesor({
      nombre: nom,
      usuario: usu,
      password: pss,
      rol: rol
    });
    await nuevoProfesor.save();
    return nuevoProfesor;
  }catch(error){
    console.log(error);
    throw new Error('Error al crear profesor');
  }
}

/**
 * Elimina un profesor por su ID.
 * @param {string} id - El ID del profesor a eliminar.
 * @returns {Promise<Object|null>} Un objeto que representa al profesor eliminado o null si no se encuentra.
 */
async function eliminarProfesor(id) {
  try {
    const profesorBorrado = await Profesor.findByIdAndDelete(id);
    return profesorBorrado;
  } catch (error){
    throw new Error('Error al eliminar Alumno');
  }
}

/**
 * Modifica un profesor existente por su ID (actualiza).
 * 
 * Esta función busca primero un profesor por su ID para verificar si existe.
 * Si el profesor existe, procede a actualizarlo con los datos proporcionados.
 * Si el profesor no se encuentra, lanza un error.
 *
 * @param {string} id - El ID único del profesor a actualizar.
 * @param {string} nom - Nombre del profesor  a actualizar.
 * @param {string} usu - Usuario del profesor  a actualizar.
 * @param {string} pss - Password del profesor  a actualizar.
 * @param {string} rol - Rol del profesor  a actualizar.
 * @returns {Promise<Object>} - Promesa que resuelve al objeto del alumno actualizado. Si el alumno no se encuentra, la promesa rechaza con un error.
 * @throws {Error} - Lanza un error si el alumno no se encuentra en la base de datos.
 *
 */
async function modificarProfesor(id, nom, usu, pss, rol) {
  const profesorExistente = await Profesor.findById (id);
  if (!profesorExistente){
    throw new Error ('El profesor no está registrado') ;
  }
  const profesorModificar = await Profesor.findByIdAndUpdate(id, {
    nombre: nom,
    usuario: usu,
    password: pss,
    rol: rol,
  });
  return profesorModificar;
}

/**
 * Validacion de acceso de un profesor existente por su usuario y password.
 * 
 * Esta función valida el acceso a traves de un usuario y password a través de JSON web Token.
 * Si el profesor existe, y los datos de acceso son correcto lanza un token correcto.
 * Si el profesor no se encuentra o los datos son erroneos, lanza un error.
  
 * @param {string} usu - Usuario del profesor  a actualizar.
 * @param {string} pss - Password del profesor  a actualizar.
 * @returns {Promise<Object>} - Promesa que resuelve al objeto del alumno actualizado. Si el alumno no se encuentra, la promesa rechaza con un error.
 * @throws {Error} - Lanza un error si el alumno no se encuentra en la base de datos.
 *
 */
async function login(usu, pwd) {
  const usuarioEncontrado = await Profesor.findOne({usuario:usu});
  if (usuarioEncontrado) {
    if (usuarioEncontrado.password === pwd) {
      const token = jwt.sign(
        { id: usuarioEncontrado._id, name: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol },
        process.env.JWTSECRET,
        { expiresIn: "1h" }
        );
      return {
        usuario: usuarioEncontrado,
        token: token,
        msg: null,
      };
    } else {
      return {
        usuario: null,
        token: null,
        msg: "Contraseña incorrecta",
      };
    }
  } else {
    return {
      usuario: null,
      token: null,
      msg: "Usuario incorrecta",
    };
  }
}

module.exports = {
  buscarTodos,
  buscarPorId,
  crearProfesor,
  eliminarProfesor,
  modificarProfesor,
  login,
};
