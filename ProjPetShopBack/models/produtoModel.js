const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    cod: {type: Number, unique: true},
    nome: String,
    imagem: {data: Buffer, contentType: String},
    descricao: String,
    preco: Number,
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'categorias'},
    animal: String,
    comentario: [{texto: String, nota: Number}]
});

module.exports = mongoose.model('produtos', produtoSchema);
