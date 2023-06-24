const categoriaModel = require('../models/categoriaModel');
const fs = require('fs');

class CategoriaController {
    // Método para cadastrar uma nova categoria
    async cadastrar(req, res) {
        let categoria = req.body;

        try {
            // Encontra a categoria com o maior código e incrementa o código da nova categoria
            const max = await categoriaModel.findOne({}).sort({ cod: -1 });
            categoria.cod = max == null ? 1 : max.cod + 1;
            // Cria a nova categoria no banco de dados
            const resultado = await categoriaModel.create(categoria);
            res.status(201).json(resultado);

        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar cadastro do categoria.' })
        }
    }
    // Método para listar todas as categorias
    async listar(req, res) {

        try {
            // Encontra todas as categorias no banco de dados
            const resultado = await categoriaModel.find({});

            if (!resultado) {
                res.status(404).json({ mensagem: 'Nenhum categoria encontrado!' })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro durante a listagem.' })
        }
    }
     // Método para buscar uma categoria por código
    async buscarPorCod(req, res) {
        const cod = req.params.cod;

        try {
            // Encontra a categoria no banco de dados com o código especificado
            const resultado = await categoriaModel.findOne({ 'cod': cod });

            if (!resultado) {
                res.status(404).json({ mensagem: `categoria com Codigo: ${cod} não encontrado!` })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar busca por codigo.' })
        }
    }
    // Método para atualizar uma categoria existente
    async atualizar(req, res) {
        const cod = req.params.cod;
    
        try {
            // Verifica se a categoria existe no banco de dados
            const categoriaExistente = await categoriaModel.findOne({ 'cod': cod });
    
            if (!categoriaExistente) {
                res.status(404).json({ mensagem: `Nenhum categoria com o codigo: ${cod} encontrado para alteração!` });
                return;
            }
    
            const _id = String(categoriaExistente._id);
            const atualizacao = req.body;
            // Atualiza a categoria no banco de dados com os novos dados
            await categoriaModel.findByIdAndUpdate(String(_id), atualizacao);
    
            res.status(200).json({ mensagem: 'Categoria atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao realizar alteração de categoria.' });
        }
    }
     // Método para excluir uma categoria
    async excluir(req, res) {
        const cod = req.params.cod;

        try {
             // Encontra a categoria no banco de dados pelo código e remove
            const _id = String((await categoriaModel.findOne({ 'cod': cod }))._id);
            await categoriaModel.findByIdAndRemove(String(_id));

            if (!_id) {
                res.status(404).json({ mensagem: `Nenhum categoria com o codigo: ${cod} encontrado para ser excluido!` })
            } else {
                res.status(200).json({ mensagem: `Categoria excluido com sucesso` });
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao excluir o categoria.' })
        }
    }
}

module.exports = new CategoriaController();
