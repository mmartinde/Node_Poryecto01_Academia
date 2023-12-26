const Curso = require("../models/cursos.model");

async function buscarTodos() {
  const cursos = await Curso.find();
  return cursos;
}

async function buscarPorId(id) {
  const cursoEncontrado = await Curso.findById(id);
  return cursoEncontrado;
}

async function crearCurso(niv, dia, hor, aul, pro) {
  const nuevoCurso = new Curso({
    nivel: niv,
    dia: dia,
    hora: hor,
    aula: aul,
    profesor: pro
  });
  await nuevoCurso.save();
  return nuevoCurso;
}

async function eliminarCurso(id) {
  const cursoBorrado = await Curso.findByIdAndDelete(id);
  return cursoBorrado;
}

async function modificarCurso(id, niv, dia, hor, aul, pro) {
  const cursoModificar = await Curso.findByIdAndUpdate(id, {
    nivel: niv,
    dia: dia,
    hora: hor,
    aula: aul,
    profesor: pro
  });
  return cursoModificar;
}

module.exports = {
  buscarTodos,
  buscarPorId,
  crearCurso,
  eliminarCurso,
  modificarCurso,
};
