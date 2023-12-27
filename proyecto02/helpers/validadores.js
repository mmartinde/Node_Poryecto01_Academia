function validarCrearCurso (body){
    if (body.nivel === undefined ||
        body.nivel.trim() === "" ||
        body.dia === undefined ||
        body.dia.trim() === "" ||
        body.hora === undefined ||
        body.hora.trim() === "" ||
        body.aula === undefined ||
        body.aula.trim() === "" ||
        body.profesor === undefined ||
        body.profesor.trim() === ""
      ) {
       return{
        valido:false,
        mensaje: "faltan datos del curso"
       }
      }
      else{
        return{
            valido:true,
            mensaje:null,
        }
      }
}

function validarCrearAlumno(body){
  if (body.nombre === undefined ||
      body.nombre.trim() === "" ||
      body.apellidos === undefined ||
      body.apellidos === "" ||
      body.nombreTutor === undefined ||
      body.nombreTutor.trim() === "" ||
      body.dniTutor === undefined ||
      body.dniTutor.trim() === "" ||
      body.formaDePago === undefined ||
      body.formaDePago.trim() === "" ||
      body.datosBancarios === undefined ||
      body.datosBancarios.trim() === "" ||
      body.email === undefined ||
      body.email.trim() === "" ||
      body.telefono === undefined ||
      body.curso === undefined ||
      body.curso.trim() === ""
    ) {
     return{
      valido:false,
      mensaje: "faltan datos del alumno"
     };
    }
    else{
      return{
          valido:true,
          mensaje:null,
      };
    }
}

function validarCrearProfesor (body){
  if (body.nombre === undefined ||
      body.nombre.trim() === "" ||
      body.usuario === undefined ||
      body.usuario.trim() === "" ||
      body.password === undefined ||
      body.password === "" ||
      body.rol === undefined ||
      body.rol.trim() === "" 
    ) {
     return{
      valido:false,
      mensaje: "faltan datos del curso"
     }
    }
    else{
      return{
          valido:true,
          mensaje:null,
      }
    }
}

/**
 * Extrae los nombres de los campos de un esquema de Mongoose, para usarlos como campos de validacion.
 * @param {mongoose.Schema} esquema - El esquema de Mongoose del cual extraer los campos.
 * @returns {string[]} Lista de nombres de campos del esquema.
 */
function extraerCamposDeEsquema(esquema) {
  // esquema.paths es un objeto donde las clases son los nombres de los campos definidos en el esquema de Monggoose
  // Object.keys es una funcion que toma un objeto como argumento y devuelve un array de todos los nombres d epropiedades de ese objeto (clases dentro del objeto)
//  Object.keys(esquema.paths) devuelve un array de todos los nombres de las propiedades definidas en los schemas
  return Object.keys(esquema.paths).filter(key => !key.startsWith('_')); //extrae todos los nombres de campos definidos por los schemas de mongoose y los devuelve en forma de array, excluyendo los campos internos agregados por mongoose (_id, _v)
}

// function validarPatchAlumnos(req, res, next) {
//   const camposValidos = ['nombre', 'apellidos', 'nombreTutor', 'dniTutor', 'formaDePago', 'datosBancarios', 'email', 'telefono', 'curso'];
//   const camposSolicitud Object.keys(req.body);

//   for (let campo of camposSolicitud) {
//     if (!camposValidos.includes(campo)) {
//       return res.status(400).json({ msg: `Campo no valido: ${campo}` })
//     }
//   }
  
//   next();
// }

module.exports ={
  validarCrearCurso,
  validarCrearAlumno,
  validarCrearProfesor,
  extraerCamposDeEsquema
}