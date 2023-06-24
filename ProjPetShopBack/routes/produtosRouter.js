const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const multer = require('multer');
const upload = multer()

router.get('/', produtoController.listar);
router.post('/', upload.single('imagem'),produtoController.cadastrar);
router.get('/:cod', produtoController.buscarPorCod);
router.put('/:cod', upload.single('imagem'), produtoController.atualizar);
router.delete('/:cod', produtoController.excluir);

module.exports = router;