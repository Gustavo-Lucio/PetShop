const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    cod: {type: Number, unique: true},
    nome: String,
    endereco: String, 
    telefone: Number,    
    cpf: String,
    nomeCartao: String,
    numeroCartao: String,
    cvcCartao: String,
    email: String,
    senha: String,
    imagem: {data: Buffer, contentType: String}
});

module.exports = mongoose.model('clientes', clienteSchema);
