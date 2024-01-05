const { validarCrearProfesor } = require("../helpers/validadores");


// Middleware para validar la creacion de un profesor
function  validarProfesor (req, res, next){
  // Llama a la funcion validarCrearProfesor (importada desde helpers) pasando los datos del cuerpo a la solicitud
    const resultadoValidacion = validarCrearProfesor(req.body);
    if (resultadoValidacion.valido){
      //  Si los datos son validos, pasa el control al siguiente middleware en la cadena
      next();// Next termina el middleware pasando control al proximo.
  }else{
    res.status(400).json({ msg: resultadoValidacion.mensaje });
  }
  }

    
  module.exports ={
    validarProfesor,
  }
