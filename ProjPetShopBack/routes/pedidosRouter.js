const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/pedido', pedidoController.listar);
router.post('/pedido', pedidoController.gerarPedido);
router.get('/pedido/id/:id', pedidoController.buscarPorId);
router.put('/pedido/id/:id', pedidoController.atualizar);
router.delete('/pedido/:id', pedidoController.excluir);

module.exports = router;