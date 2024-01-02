const express = require("express");

const router = express.Router();

//Importa el modelo de cursos para usar el middleware de validacion
const Cursos = require('../models/cursos.model')

const {
  buscarTodos,
  buscarPorId,
  crearCurso,
  eliminarCurso,
  modificarCurso,
} = require("../controllers/cursos.controller");

const { validarCrearCurso } = require("../helpers/validadores");
const { validarCamposPatch } = require('../middlewares/validadorPatch.middleware');
const { validarCurso } = require('../middlewares/cursos.middleware');

// usa el validador de campos, y asigna los campos validos a una variable
const validarCamposCurso = validarCamposPatch(Cursos);

//obtengo todos los productos de la BBDD
router.get("/", async (req, res) => {
  try {
    const cursos = await buscarTodos();
    res.json(cursos);
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

//obtener producto por id de la BBDD
router.get("/:id", async (req, res) => {
  try {
    const cursoEncontrado = await buscarPorId(req.params.id);
    if (cursoEncontrado) {
      res.json(cursoEncontrado);
    } else {
      res.status(404).json({ msg: "error: curso no encontrado" });
    }
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

//Crear un curso nuevo
router.post("/", validarCurso, async (req, res) => {
  try {
    const cursoCreado = await crearCurso(req.body)
    if (cursoCreado) {
      res.status(201).json({ msg: "Curso creado correctamente" });
    } else {
      res.status(400).json({ msg: "error: faltan datos" });
    }
  } catch (error) {
    console.error(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

//Eliminación de un objeto por id de la BBDD
router.delete("/:id", async (req, res) => {
  try {
    const cursoBorrado = await eliminarCurso(req.params.id);
    if (cursoBorrado) {
      res.json({ msg: "curso borrado" });
    } else {
      res.status(404).json({ msg: "curso no encontrado" });
    }
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

//Modificación sobre un producto en BBDD
router.put("/:id", validarCurso, async (req, res) => {
  try {
    const cursoActualizado = await modificarCurso(req.params.id, req.body);
    res.json({ msg: cursoActualizado});
  } catch (error) {
    console.error('Error en la modificacion del curso:', error);
    res.status(500).json({ msg: 'Error interno en el servidor'});
  }
});

router.patch("/:id", validarCamposCurso, async (req, res) => {
  try{
    const  cursoActualizado = await modificarCurso(req.params.id, req.body);
    res.json({ msg: cursoActualizado });

  } catch (error) {
    console.errror('Error en la modificacion del curso', error);
    res.status(500).json({ msg: 'Error intero del servidor' })
  }
});

// Exportar la información entre ficheros, para ser importado desde otro fichero
module.exports = router;
