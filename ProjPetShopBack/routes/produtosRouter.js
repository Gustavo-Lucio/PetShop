const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.listar);
router.post('/', produtoController.salvar);
router.get('/:cod', produtoController.buscarPorCod);
router.put('/:cod', produtoController.atualizar);
router.delete('/:cod', produtoController.excluir);

module.exports = router;