const mongoose = require('mongoose');

const Schema =mongoose.Schema

const cursosSchema = new Schema({
nivel:{
    type: String,
    require: true,
},
dia:{
    type: String,
    require: true,
},
hora:{
    type: String,
    require: true,
},
aula: {
    type: String,
    require: false,
},
profesor: {
    type: String,
    require: false,
}
});


const Cursos =mongoose.model('cursos', cursosSchema);

module.exports = Cursos;