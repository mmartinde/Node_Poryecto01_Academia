// Importa el módulo Express para crear el enrutador.
const express = require("express");

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Importa schema alumnos para usar en validador patch
const Alumnos = require('../models/alumnos.model');

// Importa las funciones del controlador y los validadores asociados a los alumnos.
const {
  buscarTodos,
  buscarPorId,
  crearAlumno,
  eliminarAlumno,
  modificarAlumno,
  modificarAlumnoParcialmente
} = require("../controllers/alumnos.controller");

const { validarCrearAlumno } = require("../helpers/validadores");
const { validarAlumno } = require("../middlewares/alumnos.middleware");
const { validarCamposPatch } = require("../middlewares/validadorPatch.middleware");

// usa el validador de campos, y asigna los campos validos a una variable
const validarCamposAlumnos = validarCamposPatch(Alumnos);

// Ruta para obtener todos los alumnos.
router.get("/", async (req, res) => {
  try {
    const alumnos = await buscarTodos();
    res.json(alumnos);
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

// Ruta para obtener un alumno por su ID.
router.get("/:id", async (req, res) => {
  try {
    const alumnoEncontrado = await buscarPorId(req.params.id);
    if (alumnoEncontrado) {
      res.json(alumnoEncontrado);
    } else {
      res.status(404).json({ msg: "error: alumno no existe" });
    }
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

// Ruta para crear un nuevo alumno.
router.post("/", async (req, res) => {
  // Agrego el operador '?' luego del req para asegurarme que si hay undefined o null haga cortocircuito y devuelva un undefined sin hacer el trim
  try {
    const nuevoAlumno = await crearAlumno(
      req.body.nombre?.trim(),
      req.body.apellidos?.trim(),
      req.body.nombreTutor?.trim(),
      req.body.dniTutor?.trim(),
      req.body.formaDePago?.trim(),
      req.body.datosBancarios?.trim(),
      req.body.email?.trim(),
      req.body.telefono,
      req.body.curso?.trim()
    );
    res.status(201).json({ msg: 'alumno creado correctamente' })
    } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

// Ruta para eliminar un alumno por su ID.
router.delete("/:id", async (req, res) => {
  try {
    const alumnoBorrado = await eliminarAlumno(req.params.id);
    if (alumnoBorrado) {
      res.json({ msg: "El alumno ha sido borrado" });
    } else {
      res.json({ msg: "alumno no encontrado" });
    }
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

// Ruta para actualizar un alumno por su ID.
router.put("/:id", validarAlumno, async (req, res) => {
  try {
    const alumnoActualizado = await modificarAlumno(req.params.id, req.body); //req.params.id contiene el id a actualizar, req.body contiene las propiedades del objeto a ser modificadas
    res.json({ msg: alumnoActualizado });
  } catch (error) {
    console.error("Error en la mofidicacion del alumno:", error);
    res.status(500).json({ msg: "error interno ene l servidor" })
  }
});

// Ruta para actualizar parcialmente un alumno por su ID.
router.patch("/:id", validarCamposAlumnos, async (req, res) => {
  try {
    const alumnoActualizado = await modificarAlumnoParcialmente(req.params.id, req.body); //llamo a la funcion asincrona modificarAlumnoParcialmente desde los controllers. Le paso el id y el body de la solicitud.
    res.json({ msg: alumnoActualizado });
  } catch (error) {
    console.error("Error en la modificación del alumno:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
});

// Exportar la información entre ficheros, para ser importado desde otro fichero
module.exports = router;
