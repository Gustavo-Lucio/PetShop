const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.listar);
router.post('/', categoriaController.salvar);
router.get('/:id', categoriaController.buscarPorId);
router.put('/:id', categoriaController.atualizar);
router.delete('/:id', categoriaController.excluir);

module.exports = router;