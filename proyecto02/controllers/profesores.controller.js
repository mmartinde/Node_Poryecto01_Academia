const Profesor = require("../models/profesores.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function buscarTodos() {
  const profesores = await Profesor.find();
  return profesores;
}

async function buscarPorId(id) {
  const profesorEncontrado = await Profesor.findById(id);
  return profesorEncontrado;
}

async function crearProfesor(nom, usu, pss, rol) {
  const nuevoProfesor = new Profesor({
    nombre: nom,
    usuario: usu,
    password: pss,
    rol: rol,
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
    rol: rol,
  });
  return profesorModificar;
}

async function login(usu, pwd) {
  const usuarioEncontrado = await Profesor.findOne({usuario:usu});
  if (usuarioEncontrado) {
    if (usuarioEncontrado.password === pwd) {
      const token = jwt.sign(
        { id: usuarioEncontrado._id, name: usuarioEncontrado.usuario },
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
