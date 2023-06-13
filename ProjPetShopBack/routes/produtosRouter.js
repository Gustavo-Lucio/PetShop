const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/produto', produtoController.listar);
router.post('/produto', produtoController.salvar);
router.get('/produto/id/:id', produtoController.buscarPorId);
router.put('/produto/id/:id', produtoController.atualizar);
router.delete('/produto/:id', produtoController.excluir);

module.exports = router;