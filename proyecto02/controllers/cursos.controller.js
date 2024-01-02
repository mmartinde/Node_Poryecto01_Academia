const Cursos = require("../models/cursos.model");
const Curso = require("../models/cursos.model");

async function buscarTodos() {
  try {
    const cursos = await Curso.find();
    return cursos
  } catch (error) {
    throw new Error('Error al buscar lista de alumnos')
}
}

async function buscarPorId(id) {
  try {
    const cursoEncontrado = await Curso.findById(id);
    return cursoEncontrado;
  } catch (error) {
    throw new Error ('Error al buscar curso por ID');
  }
}

async function crearCurso(datosCurso) {
  try {
    const nuevoCurso = new Cursos({
      nivel: datosCurso.nivel,
      dia: datosCurso.dia,
      hora: datosCurso.hora,
      aula: datosCurso.aula,
      profesores_id: datosCurso.profesores_id,
      alumnos: datosCurso.alumnos || [] // se asegura que al crear un curso, acepte el array vacio (al crear un curso, no deberia asignarse alumno de primeras)
    });

    await nuevoCurso.save();
    return nuevoCurso;
  } catch (error) {
    console.log(error);
    throw new Error('Error al crear el curso');
  }
}

async function eliminarCurso(id) {
  try {
    const cursoBorrado = await Curso.findByIdAndDelete(id);
    return cursoBorrado;
  } catch (error) {
    throw new Error('Error al eliminar curso');
  }
}

/**
 * Actualiza un curso existente en la base de datos.
 *
 * Esta función busca un curso por su ID y, si existe, actualiza sus datos con la información proporcionada.
 * Si el curso no se encuentra, lanza un error.
 *
 * @param {string} id - El ID del curso a actualizar.
 * @param {Object} datosCurso - Un objeto que contiene los datos actualizados para el curso.
 *    Este objeto podría incluir campos como 'nivel', 'dia', 'hora', etc.
 *
 * @returns {Promise<Object>} - Una promesa que resuelve al objeto del curso actualizado.
 *    Si el curso no se encuentra, la promesa rechaza con un error.
 *
 * @throws {Error} - Lanza un error si el curso no se encuentra en la base de datos o si ocurre otro error durante la actualización.
 *
 */
async function modificarCurso(id, datosCurso) {
  try {
    //Realizar la actualizacion si el curso existe
    const cursoActualizado = await Curso.findByIdAndUpdate(id, datosCurso, {new: true });
    if (!cursoActualizado) {
      throw new Error('Curso no encontrado', error);
    }
    return cursoActualizado;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  buscarTodos,
  buscarPorId,
  crearCurso,
  eliminarCurso,
  modificarCurso,
};
