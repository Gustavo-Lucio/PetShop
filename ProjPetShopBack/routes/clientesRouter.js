const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.post('/', clienteController.cadastrar);
router.get('/:cod', clienteController.buscarPorCod);
router.get('/email/:email', clienteController.buscarPorEmail);
router.put('/:cod', clienteController.atualizar);
router.delete('/:cod', clienteController.excluir);

module.exports = router;