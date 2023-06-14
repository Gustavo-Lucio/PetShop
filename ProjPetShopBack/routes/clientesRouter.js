const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.post('/', clienteController.cadastrar);
router.get('/:id', clienteController.buscarPorId);
router.get('/email/:email', clienteController.buscarPorEmail);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.excluir);

module.exports = router;