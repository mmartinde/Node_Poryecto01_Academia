const Profesor = require("../models/profesores.model");

async function buscarTodos() {
  const profesores = await Profesor.find();
  return profesores;
}

async function buscarPorId(id) {
  const profesorEncontrado = await Profesor.findById(id);
  return profesorEncontrado;
}

async function crearProfesor (nom, usu, pss, rol) {
  const nuevoProfesor = new Profesor({
    nombre: nom,
    usuario: usu,
    password: pss,
    rol: rol
  });
  await nuevoProfesor.save();
  return nuevoProfesor;
}

async function eliminarProfesor(id) {
  const profesorBorrado = await Profesor.findByIdAndDelete(id);
  return profesorBorrado;
}

async function modificarProfesor(id, nom, usu, pss, rol) {
  const profesorModificar = await Profesor.findByIdAndUpdate(id, {
    nombre: nom,
    usuario: usu,
    password: pss,
    rol: rol
  });
  return profesorModificar;
}

module.exports = {
  buscarTodos,
  buscarPorId,
  crearProfesor,
  eliminarProfesor,
  modificarProfesor,
};
