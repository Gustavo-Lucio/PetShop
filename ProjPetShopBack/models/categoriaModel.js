const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    cod: {type: Number, unique: true},
    nome: String,
    descricao: String
});

module.exports = mongoose.model('categorias', categoriaSchema);
