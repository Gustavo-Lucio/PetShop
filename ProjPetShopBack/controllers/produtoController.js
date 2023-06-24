const produtoModel = require('../models/produtoModel');
const categoriaModel = require("../models/categoriaModel");

const fs = require('fs');

const path = require('path');
const caminhoImagens = path.join(__dirname, '../imagens');

class ProdutoController {
    // Método para cadastrar um novo produto
    async cadastrar(req, res) {
        try {
            // Obter o último código de produto cadastrado
            const max = await produtoModel.findOne({}).sort({ cod: -1 });
            let produto = req.body;
            produto.cod = max == null ? 1 : max.cod + 1;

            // Carregar a imagem do arquivo
            const arquivoBuffer = fs.readFileSync(caminhoImagens + produto.imagem);
            produto.imagem = arquivoBuffer;
            // Obter a categoria do produto e substituir o código pelo ID correspondente
            const categoria = await categoriaModel.findOne({ cod: produto.categoria });
            produto.categoria = categoria._id;
            // Criar o novo produto
            const resultado = await produtoModel.create(produto);
            res.status(201).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao realizar cadastro do produto.' });
        }
    }
    // Método para listar todos os produtos
    async listar(req, res) {

        try {
            const resultado = await produtoModel.find({});

            if (!resultado) {
                res.status(404).json({ mensagem: 'Nenhum produto encontrado!' })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro durante a listagem.' })
        }
    }
    // Método para buscar um produto por código
    async buscarPorCod(req, res) {
        const cod = req.params.cod;

        try {
            const resultado = await produtoModel.findOne({ 'cod': cod });

            if (!resultado) {
                res.status(404).json({ mensagem: `Produto com codigo: ${cod} não encontrado!` })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar busca por Codigo.' })
        }
    }
    // Método para atualizar um produto existente
    async atualizar(req, res) {
        const cod = req.params.cod;
    
        try {
            const produtoExistente = await produtoModel.findOne({ 'cod': cod });
    
            if (!produtoExistente) {
                res.status(404).json({ mensagem: `Nenhum produto com o código ${cod} encontrado para alteração!` });
                return;
            }
    
            const { nome, descricao, preco, categoria, animal } = req.body;
            let imagem = produtoExistente.imagem; // Define a imagem como a original por padrão
    
            // Verifica se a propriedade 'imagem' existe no req.body
            if (req.body.hasOwnProperty('imagem')) {
                // Carrega a nova imagem do arquivo
                const arquivoBuffer = fs.readFileSync(caminhoImagens + req.body.imagem);
                imagem = arquivoBuffer;
            }
    
            const atualizacao = {
                nome,
                descricao,
                preco,
                categoria,
                animal,
                imagem,
            };
    
            // Verifica se há um campo 'categoria' na requisição PUT
            if (categoria) {
                const categoriaEncontrada = await categoriaModel.findOne({ cod: categoria });
    
                if (!categoriaEncontrada) {
                    res.status(400).json({ mensagem: `Categoria com o código ${categoria} não encontrada!` });
                    return;
                }
    
                atualizacao.categoria = categoriaEncontrada._id;
            }
    
            await produtoModel.findOneAndUpdate({ 'cod': cod }, atualizacao);
    
            res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao realizar alteração de produto.' });
        }
    }

    async excluir(req, res) {
        const cod = req.params.cod;

        try {
            const _id = String((await produtoModel.findOne({ 'cod': cod }))._id);
            await produtoModel.findByIdAndRemove(String(_id));

            if (!_id) {
                res.status(404).json({ mensagem: `Nenhum produto com o codigo: ${cod} encontrado para ser excluido!` })
            } else {
                res.status(200).json({ mensagem: `Produto excluido com sucesso` });
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao excluir o produto.' })
        }
    }
}

module.exports = new ProdutoController();
