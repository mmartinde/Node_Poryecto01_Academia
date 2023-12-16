// Importa el módulo HTTP de Node.js
const http = require("http");

// Define el puerto en el que se ejecutará el servidor
const PORT = 3000;

// Función que maneja las solicitudes y genera respuestas
function answer(req, res) {
  console.log ('hola');
  // Registra la URL de la solicitud en la consola
  console.log(req.url);

  // Configura el encabezado de la respuesta para indicar que se devolverá JSON
  res.setHeader("Content-Type", "application/json");
    // Maneja diferentes rutas y genera respuestas JSON correspondientes

  if (req.url === "/alumnos") {
        // Respuesta para la ruta "/alumnos"
    res.end(JSON.stringify({ nombre: "smith", dni: "213214654X" }));
  } else if (req.url === "/cursos") {
        // Respuesta para la ruta "/cursos"
    res.end(
      JSON.stringify([
      ]) // Respuesta JSON con un array vacío
    );
  } else {
    // Respuesta para cualquier otra ruta
    res.end(JSON.stringify({ msg: "Error" }));
  }
}

// Crea un servidor HTTP y asocia la función de respuesta
const server = http.createServer(answer);

// Escucha en el puerto especificado y muestra un mensaje cuando el servidor está listo
server.listen(PORT, () => {
  console.log(`Server started in http://localhost:${PORT}`);
});
