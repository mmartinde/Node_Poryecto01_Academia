// Importa el módulo Express para crear el enrutador.
const express = require("express");

// Crea una instancia del enrutador de Express.
const router = express.Router();

// Importa las funciones del controlador y los validadores asociados a los alumnos.
const {
  buscarTodos,
  buscarPorId,
  crearProfesor,
  eliminarProfesor,
  modificarProfesor,
  login,
} = require("../controllers/profesores.controller");

const {
  validarProfesor,
} = require("../middlewares/profesores.middleware");

const { estaLoggeado } = require('../middlewares/autenticador.middleware');

const { encriptarPassword } = require('../helpers/encriptador');

// Ruta para obtener todos los propfesores.
router.get("/", async (req, res) => {
  try {
    const profesores = await buscarTodos();
    res.json(profesores);
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

// Ruta para obtener un profesor por su ID.
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

// Ruta para crear un nuevo profesor.
router.post("/", validarProfesor, async (req, res) => {
  try {
    // Encripta la contraseña antes de pasarla a crearProfesor
    const passwordEncriptada = await encriptarPassword(req.body.password);

    const profesorCreado = await crearProfesor(
      req.body.nombre.trim(),
      req.body.usuario.trim(),
      passwordEncriptada, // Usa la contraseña encriptada
      req.body.rol.trim()
    );

    res.json({ msg: "Profesor creado correctamente" });
  } catch (error) {
    console.log(String(error));
    res.status(500).json({ msg: "error interno" });
  }
});

// Ruta para eliminar un profesor por su ID.
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

// Ruta para actualizar un profeso por su ID.
router.put("/:id",validarProfesor, async (req, res) => {
  try {
    const profesorActualizado = await modificarProfesor(
        req.params.id,
        req.body.nombre.trim(),
        req.body.usuario.trim(),
        req.body.password,
        req.body.rol.trim()
      );
      res.json({msg: profesorActualizado });
    }catch (error) {
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
      mensajes: encontrado
        ? []
        : ["Error: profesor no encontrado", `ID: ${req.params.id}`],
    });
  } catch (error) {
    console.error("Error en la modificación del profesor:", error);
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
});

// Zona privada Profesores

//login
router.post("/login", async (req, res) => {
  try {
    const resultado = await login(req.body.usuario, req.body.password);
    res.json({token:resultado.token, msg:resultado.msg});
  } catch (error) {
    res.status(500).json({ msg: "Error interno en el servidor" });
  }
});

router.get('/privado/:id', estaLoggeado, async (req, res) => {
  const profesorEncontrado = await buscarPorId(req.params.id);
  res.json({msg: 'bienvenido a tu perfil '+ profesorEncontrado.usuario})
});

// Exportar la información entre ficheros, para ser importado desde otro fichero
module.exports = router;
