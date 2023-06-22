const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../auth/auth');

router.use(auth.autorizar);

router.get('/', pedidoController.listar);
router.post('/', pedidoController.gerarPedido);
router.get('/:cod', pedidoController.buscarPorCod);
router.put('/:cod', pedidoController.atualizar);
router.delete('/:cod', pedidoController.excluir);

module.exports = router;