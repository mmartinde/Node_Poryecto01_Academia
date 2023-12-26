// Importa el modelo "Alumnos" que representa la colección de alumnos en MongoDB.
const Alumnos = require("../models/alumnos.model");
const Cursos = require("../models/cursos.model"); // Importa schema de cursos

/**
 * Busca y devuelve todos los alumnos.
 * @returns {Promise<Array>} Un array que contiene todos los alumnos.
 */
async function buscarTodos() {
  try{
    const alumnos = await Alumnos.find();
    return alumnos;
  } catch (error) {
    throw new Error('Error al buscar lista de alumnos')
  }
}

/**
 * Busca un alumno por su ID.
 *
 * Esta función realiza una búsqueda en la base de datos para encontrar un alumno específico
 * utilizando su ID como parámetro.
 * @param {String} id El ID del alumno que se desea buscar.
 * @returns {Object|Null} Retorna el objeto del alumno si se encuentra, o null si el alumno no existe.
 */
async function buscarPorId(id) {
  try {
    const alumnoEncontrado = await Alumnos.findById(id); //Cambio nombre de variable, para mantener coherencia con la app.
    return (alumnoEncontrado); //retorna el alumno, o null si no existe
  } catch (error) {
    throw new Error('Error al buscar alumno por ID')
  }
}

/**
 * Crea un nuevo alumno y lo asigna a un curso, si se proporciona.
 *
 * Esta función crea un nuevo registro de alumno en la base de datos con los datos proporcionados.
 * Si se incluye un ID de curso, también añade al alumno al curso especificado. Esto es manejado
 * mediante la adición del ID del alumno al array de 'alumnos' en el documento del curso.
 *
 * @param {String} nom Nombre del alumno.
 * @param {String} ape Apellidos del alumno.
 * @param {String} tuto Nombre del tutor del alumno.
 * @param {String} dni DNI del tutor del alumno.
 * @param {String} pag Forma de pago del curso.
 * @param {String} banc Datos bancarios para el pago.
 * @param {String} mail Email del alumno.
 * @param {Number} tlf Teléfono de contacto del alumno.
 * @param {String} cur ID del curso al cual asignar al alumno (opcional).
 * @returns {Object} El objeto del alumno creado.
 */
async function crearAlumno(nom, ape, tuto, dni, pag, banc, mail, tlf, cur) {
  //Trycatch para manejar los casos de alumnos con curso asignado, y sin ellos
  try {
    //Crear el nuevo alumno
    const nuevoAlumno = new Alumnos({
      nombre: nom,
      apellidos: ape,
      nombreTutor: tuto,
      dniTutor: dni,
      formaDePago: pag,
      datosBancarios: banc,
      email: mail,
      telefono: tlf,
      cursos_id: cur
    });
    
    await nuevoAlumno.save();

    // Si el alumno tiene curso asignado, agregalo al curso correspondiente
    if (cur) {
      const curso = await Cursos.findById(cur);
      if (curso) {
        curso.alumnos.push(nuevoAlumno._id); //'.alumnos' hace referencia a la propiedad 'alumnos' en el esquema (el array que contendra la lista de objetos con los alumnos)

        await curso.save();
      } else {
        throw new Error('Curso no encontrado');
      }
    }
  
    return nuevoAlumno;

  } catch (error) {
    console.log(error)
    throw new Error('Error al crear alumno')
  }
}

/**
 * Elimina un alumno por su ID.
 * @param {string} id - El ID del alumno a eliminar.
 * @returns {Promise<Object|null>} Un objeto que representa al alumno eliminado o null si no se encuentra.
 */
async function eliminarAlumno(id) {
  try {
    const alumnoBorrado = await Alumnos.findByIdAndDelete(id);
    return alumnoBorrado;
    
  } catch (error) {
    throw new Error('Error al eliminar Alumno');
  }
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
