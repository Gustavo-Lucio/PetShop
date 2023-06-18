const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.listar);
router.post('/', pedidoController.gerarPedido);
router.get('/:cod', pedidoController.buscarPorId);
router.put('/:cod', pedidoController.atualizar);
router.delete('/:cod', pedidoController.excluir);

module.exports = router;