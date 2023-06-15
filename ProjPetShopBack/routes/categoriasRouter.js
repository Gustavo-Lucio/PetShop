const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.listar);
router.post('/', categoriaController.salvar);
router.get('/:cod', categoriaController.buscarPorId);
router.put('/:cod', categoriaController.atualizar);
router.delete('/:cod', categoriaController.excluir);

module.exports = router;