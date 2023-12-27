// Importa el módulo Express para crear el enrutador.
const express = require("express");

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Importa las funciones del controlador y los validadores asociados a los alumnos.
const {
  buscarTodos,
  buscarPorId,
  crearAlumno,
  eliminarAlumno,
  modificarAlumno,
} = require("../controllers/alumnos.controller");

const { validarCrearAlumno } = require("../helpers/validadores");
const { validarAlumno } = require("../middlewares/alumnos.middleware");

//CRUD
/** 
 C: CREATE
 R: READ
 U: UPDATE - PUT/PATCH
 D: DELETE
*/

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
      req.body.curso_id?.trim()
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
    res.json({ dato: alumnoActualizado });
    // let encontrado = null;
    // let msg = [];

    // // Validación de datos antes de intentar la modificación.
    // const resultadoValidacion = validarCrearAlumno(req.body);
    // if (!resultadoValidacion.valido) {
    //   res.status(400).json({ msg: resultadoValidacion.mensaje });
    // } else {
    //   // Modificación del alumno.
    //   encontrado = await modificarAlumno(
    //     req.params.id,
    //     req.body.nombre,
    //     req.body.apellidos,
    //     req.body.nombreTutor,
    //     req.body.dniTutor,
    //     req.body.formaDePago,
    //     req.body.datosBancarios,
    //     req.body.email,
    //     req.body.telefono,
    //     req.body.curso
    //   );
    //   res.json(encontrado === null ? { msg: "error: alumno no encontrado" } : { dato: encontrado, mensaje: msg });
    // }
  } catch (error) {
    console.error("Error en la mofidicacion del alumno:", error);
    res.status(500).json({ msg: "error interno ene l servidor" })
    // console.error("Error en la modificación del alumno:", error);
    // res.status(500).json({ msg: "Error interno en el servidor" });
  }
});

// Ruta para actualizar parcialmente un alumno por su ID.
router.patch("/:id", async (req, res) => {
  try {
    let encontrado = null;

    // Modificación parcial del alumno.
    encontrado = await modificarAlumno(
      req.params.id,
      req.body.nombre ? req.body.nombre.trim() : undefined,
      req.body.apellidos ? req.body.apellidos.trim() : undefined,
      req.body.nombreTutor ? req.body.nombreTutor.trim() : undefined,
      req.body.dniTutor ? req.body.dniTutor.trim() : undefined,
      req.body.formaDePago ? req.body.formaDePago.trim() : undefined,
      req.body.datosBancarios ? req.body.datosBancarios.trim() : undefined,
      req.body.email ? req.body.email.trim() : undefined,
      req.body.telefono ? req.body.telefono.trim() : undefined,
      req.body.curso_id ? req.body.curso_id.trim() : undefined
    );

    res.status(encontrado ? 200 : 400).json({
      encontrado: encontrado,
      mensajes: encontrado
        ? []
        : ["Error: alumno no encontrado", `ID: ${req.params.id}`],
    });
  } catch (error) {
    console.error("Error en la modificación del alumno:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
});

// Exportar la información entre ficheros, para ser importado desde otro fichero
module.exports = router;
