const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/cliente', clienteController.listar);
router.post('/cliente', clienteController.cadastrar);
router.get('/cliente/id/:id', clienteController.buscarPorId);
router.get('/cliente/email/:email', clienteController.buscarPorEmail);
router.put('/cliente/id/:id', clienteController.atualizar);
router.delete('/cliente/:id', clienteController.excluir);

module.exports = router;