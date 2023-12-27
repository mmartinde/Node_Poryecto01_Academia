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
  validarCrearProfesor
}