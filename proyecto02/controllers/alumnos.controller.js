// Importa el modelo "Alumnos" que representa la colección de alumnos en MongoDB.
const Alumnos = require("../models/alumnos.model");
const Cursos = require("../models/cursos.model"); // Importa schema de cursos

/**
 * Busca y devuelve todos los alumnos.
 * @returns {Promise<Array>} Un array que contiene todos los alumnos.
 */
async function buscarTodos() {
  const usuario = await Alumnos.find();
  return usuario;
}

/**
 * Busca y devuelve un alumno por su ID.
 * @param {string} id - El ID del alumno a buscar.
 * @returns {Promise<Object|null>} Un objeto que representa al alumno encontrado o null si no se encuentra.
 */
async function buscarPorId(id) {
  const usuarioEncontrado = await Alumnos.findById(id);
  return usuarioEncontrado;
}

/**
 * Crea un nuevo alumno.
 * @param {string} nom - Nombre del alumno.
 * @param {string} ape - Apellidos del alumno.
 * @param {string} tuto - Nombre del tutor del alumno.
 * @param {string} dni - DNI del tutor del alumno.
 * @param {string} pag - Forma de pago del alumno.
 * @param {string} banc - Datos bancarios del alumno.
 * @param {string} mail - Correo electrónico del alumno.
 * @param {string} tlf - Número de teléfono del alumno.
 * @param {string} cur - ID del curso al que pertenece el alumno.
 * @returns {Promise<Object>} Un objeto que representa al nuevo alumno creado.
 */
async function crearAlumno(nom, ape, tuto, dni, pag, banc, mail, tlf, cur) {
  //Trycatch para manejar los casos de alumnos con curso asignado, y sin ellos
  try {
    //Crear el nuevo alumno
    const nuevoAlumno = new Alumno({
      nombre: nom,
      apellidos: ape,
      nombreTutor: tuto,
      dniTutor: dni,
      formaDePago: pag,
      datosBancarios: banc,
      email: mail,
      telefono: tlf,
      curso_id: cur
    });
    
    await nuevoAlumno.save();

    // Si el alumno tiene curso asignado, agregalo al curso correspondiente
    if (requestAnimationFrame.body.curso_id) {
      const curso = await Cursos.findById(req.body.curso_id);
      if (curso) {
        curso.alumnos.push(nuevoAlumno._id); //'.alumnos' hace referencia a la propiedad 'alumnos' en el esquema (el array que contendra la lista de objetos con los alumnos)

        await curso.save();
      }
    }
    
    res.status(201).json({ msg: `alumno: ${nuevoAlumno} creado`}) //devuelvo codigo 201. Significa que la peticion ha sido exitosa y como resultado se ha creado el alumno (nuevo recurso)
  } catch (error) {
    res.status(500).json({ msg: 'error'}) //devuelvo codigo 500. Es un codigo general que me permite proteger al servidor e informar que algo salio mal.
    
  }
  return nuevoAlumno;
}

/**
 * Elimina un alumno por su ID.
 * @param {string} id - El ID del alumno a eliminar.
 * @returns {Promise<Object|null>} Un objeto que representa al alumno eliminado o null si no se encuentra.
 */
async function eliminarAlumno(id) {
  const alumnoBorrado = await Alumnos.findByIdAndDelete(id);
  return alumnoBorrado;
}

/**
 * Modifica un alumno por su ID.
 * @param {string} id - El ID del alumno a modificar.
 * @param {string} nom - Nuevo nombre del alumno.
 * @param {string} ape - Nuevos apellidos del alumno.
 * @param {string} tuto - Nuevo nombre del tutor del alumno.
 * @param {string} dni - Nuevo DNI del tutor del alumno.
 * @param {string} pag - Nueva forma de pago del alumno.
 * @param {string} banc - Nuevos datos bancarios del alumno.
 * @param {string} mail - Nuevo correo electrónico del alumno.
 * @param {string} tlf - Nuevo número de teléfono del alumno.
 * @param {string} cur - Nuevo ID del curso al que pertenece el alumno.
 * @returns {Promise<Object|null>} Un objeto que representa al alumno modificado o null si no se encuentra.
 */
async function modificarAlumno(id, nom, ape, tuto, dni, pag, banc, mail, tlf, cur) {
  const alumnoModificar = await Alumnos.findByIdAndUpdate(id, {
    nombre: nom,
    apellidos: ape,
    nombreTutor: tuto,
    dniTutor: dni,
    formaDePago: pag,
    datosBancarios: banc,
    email: mail,
    telefono: tlf,
    curso_id: cur
  });
  return alumnoModificar;
}



// Exporta las funciones para su uso en alumnos.routes.js
module.exports = {
  buscarTodos,
  buscarPorId,
  crearAlumno,
  eliminarAlumno,
  modificarAlumno
};
