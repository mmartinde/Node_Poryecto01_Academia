/**
 * Valida los datos proporcionados para la creación de un curso.
 * 
 * Esta función revisa si los campos obligatorios están presentes y tienen formatos válidos.
 * Específicamente, valida los campos 'nivel', 'dia', 'hora', 'aula' y 'profesores_id'.
 * El campo 'aula' es opcional y se permite que sea indefinido.
 * Además, valida que el campo 'hora' tenga un formato de 24 horas (HH:MM).
 *
 * @param {Object} body - El cuerpo de la solicitud que contiene los datos del curso.
 * @returns {Object} Un objeto que indica si los datos son válidos y un mensaje de error si no lo son.
 * 
 * El objeto retornado tiene la forma { valido: boolean, mensaje: string|null }.
 * Si 'valido' es 'false', 'mensaje' contiene la descripción del error.
 * Si 'valido' es 'true', 'mensaje' es 'null'.
 */
function validarCrearCurso (body){
  const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/
  // Verifica la presencia y validez de campos obligatorios
    if (body.nivel === undefined ||
        body.nivel.trim() === "" ||
        body.dia === undefined ||
        body.dia.trim() === "" ||
        body.hora === undefined ||
        body.hora.trim() === "" ||
        (body.aula !== undefined &&
        body.aula.trim() === "") || //Ajusto la condicion de aula, ya que en el schema es opcional. Permito que el campo aula sea indefinido.
        body.profesores === undefined ||
        body.profesores.trim() === ""
      ) {
       return{
        valido:false,
        mensaje: "faltan datos del curso"
       }
      }
      // Valida el formato de hora (HH:MM) para el campo 'hora'
      if (body.hora && !regexHora.test(body.hora)) { //el metodo .test() busca que se el string coincida con el regex. Si coincide devuelve True, de otra forma, devuelve False
        return {
          valido: false,
          mensaje: 'formato de hora incorrecto. usa HH:MM'
        };
      }
      // Si todas las validaciones son correctas, retorna un objeto indicando validez  
      return {
            valido: true,
            mensaje: null
        };

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
      mensaje: "faltan datos del profesor"
     }
    }
    else{
      return{
          valido:true,
          mensaje:null,
      }
    }
}




module.exports ={
  validarCrearCurso,
  validarCrearAlumno,
  validarCrearProfesor
}