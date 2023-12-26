const express = require("express");
const router = express.Router();

const {
  buscarTodos,
  buscarPorId,
  crearProfesor,
  eliminarProfesor,
  modificarProfesor,
} = require("../controllers/profesores.controller");

const { validarCrearProfesor } = require("../helpers/validadores");

const {middlewareCrearProfesor} = require ("../middlewares/profesores.middleware");

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
    const profesores = await buscarTodos();
    res.json(profesores);
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

//obtener producto por id de la BBDD
/* function middlewareEncontrado (req,res,next){
  const profesorEncontrado = buscarPorId(req.params.id);
  if (profesorEncontrado.valido) {
    next ();
}else{
  res.status(404).json({ msg: "error: profesor no encontrado" });
}
} */
router.get("/:id", async (req, res) => {
  try {
    const profesorEncontrado = await buscarPorId(req.params.id);
    if (profesorEncontrado) {
      res.json(profesorEncontrado);
    } else {
      res.status(404).json({ msg: "error: profesor no encontrado" });
    }
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

//Añadimos un procunto nuevo a la BBDD

router.post("/", middlewareCrearProfesor, async (req, res) => {
  try {
    const profesorCreado = await crearProfesor(
      req.body.nombre.trim(),
      req.body.usuario.trim(),
      req.body.password,
      req.body.rol.trim()
    );
      res.json({ msg: "Profesor creado correctamente" });
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

//Eliminación de un objeto por id de la BBDD
router.delete("/:id", async (req, res) => {
  try {
    const profesorBorrado = await eliminarProfesor(req.params.id);
    if (profesorBorrado) {
      res.json({ msg: "Profesor borrado" });
    } else {
      res.status(404).json({ msg: "Profesor no encontrado" });
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
    const resultadoValidacion = validarCrearProfesor(req.body);
    if (!resultadoValidacion.valido) {
      res.status(400).json({ msg: resultadoValidacion.mensaje });
    } else {
      encontrado = await modificarProfesor(
        req.params.id,
        req.body.nombre.trim(),
        req.body.usuario.trim(),
        req.body.password,
        req.body.rol.trim()
      );
      res.json(
        encontrado === null
          ? { msg: "error: Profesor no encontrado" }
          : { dato: encontrado, mensaje: msg }
      );
    }
  } catch (error) {
    console.error("Error en la modificación del profesor:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
});

router.patch("/:id", async (req, res) => {
 try {
   let encontrado = null;
   // solamente varío los atributos que yo considero que se podrían tocar
   encontrado = await modificarProfesor(
     req.params.id,
     req.body.nombre ? req.body.nombre.trim() : undefined,
     req.body.usuario ? req.body.usuario.trim() : undefined,
     req.body.password ? req.body.password : undefined,
     req.body.rol ? req.body.rol.trim() : undefined
   );
 
   res.status(encontrado ? 200 : 400).json({
      encontrado: encontrado,
      mensajes: encontrado ? [] : ["Error: profesor no encontrado", `ID: ${req.params.id}`],
    }
   );
  } catch (error) {
    console.error("Error en la modificación del profesor:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
 }
});

// Exportar la información entre ficheros, para ser importado desde otro fichero
module.exports = router;
