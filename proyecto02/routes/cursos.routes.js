const express = require("express");

const router = express.Router();

const {
  buscarTodos,
  buscarPorId,
  crearCurso,
  eliminarCurso,
  modificarCurso,
} = require("../controllers/cursos.controller");

const { validarCrearCurso } = require("../helpers/validadores");

//CRUD
/** 
 C: CREATE
 R: READ
 U: UPDATE - PUT/PATCH
 D: DELETE
*/

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

//Añadimos un procunto nuevo a la BBDD
router.post("/", async (req, res) => {
  try {
    //const parseData = JSON.parse(responseData);
    //console.log(parseData);
    //guardado en al BBDD
    const cursoCreado = await crearCurso(
      req.body.nivel.trim(),
      req.body.dia.trim(),
      req.body.hora.trim(),
      req.body.aula.trim(),
      req.body.profesor.trim()
    );
    if (cursoCreado) {
      res.json({ msg: "Curso creado correctamente" });
    } else {
      res.status(400).json({ msg: "error: faltan datos" });
    }
  } catch (error) {
    console.log(String(error));
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
router.put("/:id", async (req, res) => {
  try {
    let encontrado = null;
    let msg = [];
    //comprobación de todos los atributos modificables vienen completos. PUT debe ser completamente ATOMICO
    const resultadoValidacion = validarCrearCurso(req.body);
    if (!resultadoValidacion.valido) {
      res.status(400).json({ msg: resultadoValidacion.mensaje });
    } else {
      encontrado = await modificarCurso(
        req.params.id,
        req.body.nivel.trim(),
        req.body.dia.trim(),
        req.body.hora.trim(),
        req.body.aula.trim(),
        req.body.profesor.trim()
      );
      res.json(
        encontrado === null
          ? { msg: "error: Curso no encontrado" }
          : { dato: encontrado, mensaje: msg }
      );
    }
  } catch (error) {
    console.error("Error en la modificación del curso:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
});

router.patch("/:id", async (req, res) => {
 try {
   let encontrado = null;
   // solamente varío los atributos que yo considero que se podrían tocar
   encontrado = await modificarCurso(
     req.params.id,
     req.body.nivel ? req.body.nivel.trim() : undefined,
     req.body.dia ? req.body.dia.trim() : undefined,
     req.body.hora ? req.body.hora.trim() : undefined,
     req.body.aula ? req.body.aula.trim() : undefined,
     req.body.profesor ? req.body.profesor.trim() : undefined
   );
 
   res.status(encontrado ? 200 : 400).json({
      encontrado: encontrado,
      mensajes: encontrado ? [] : ["Error: curso no encontrado", `ID: ${req.params.id}`],
    }
   );
  } catch (error) {
    console.error("Error en la modificación del curso:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
 }
});

// Exportar la información entre ficheros, para ser importado desde otro fichero
module.exports = router;
