const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/categoria', categoriaController.listar);
router.post('/categoria', categoriaController.salvar);
router.get('/categoria/id/:id', categoriaController.buscarPorId);
router.put('/categoria/id/:id', categoriaController.atualizar);
router.delete('/categoria/:id', categoriaController.excluir);

module.exports = router;