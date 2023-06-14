const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.listar);
router.post('/', pedidoController.gerarPedido);
router.get('/:id', pedidoController.buscarPorId);
router.put('/:id', pedidoController.atualizar);
router.delete('/:id', pedidoController.excluir);

module.exports = router;