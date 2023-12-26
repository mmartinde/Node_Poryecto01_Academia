const { validarCrearProfesor } = require("../helpers/validadores");

function  middlewareCrearProfesor (req, res, next){
    const resultadoValidacion = validarCrearProfesor(req.body);
    if (resultadoValidacion.valido){
      next();
  }else{
    res.status(400).json({ msg: "error: faltan datos" });
  }
  }

    
  module.exports ={
    middlewareCrearProfesor,
  }
