const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    cod: {type: Number, unique: true},
    precoTotal: Number,
    listaProdutos: [{produto: { type: mongoose.Schema.Types.ObjectId, ref: 'produtos' }, quantidade: Number}],
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'clientes'},
    dataHora: {type: Date, default: Date.now},
    status: {type: String, enum: ['Aguardando Pagamento', 'Faturado', 'Enviado', 'Cancelado'], default: 'Aguardando Pagamento'}
});

module.exports = mongoose.model('pedidos', pedidoSchema);
