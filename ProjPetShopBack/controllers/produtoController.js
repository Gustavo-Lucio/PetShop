const produtoModel = require('../models/produtoModel');
const categorias = require("./categorias.json");

const fs = require('fs');

class ProdutoController {

    async salvar(req, res) {
        let produto = req.body;

        try {

            // Obter os dados da imagem
            const imagemPath = req.body.imagem;
            const imagemData = fs.readFileSync(imagemPath);

            // Definir os dados da imagem no objeto do cliente
            cliente.imagem = {
                data: imagemData,
                contentType: 'image/jpg' // Substitua pelo tipo de conteúdo correto da sua imagem
            };

            const max = await produtoModel.findOne({}).sort({ id: -1 });
            produto.id = max == null ? 1 : max.id + 1;
            const resultado = await produtoModel.create(produto);
            res.status(201).json(resultado);

        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar cadastro do produto.' })
        }
    }

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

    async buscarPorId(req, res) {
        const id = req.params.id;

        try {
            const resultado = await produtoModel.findOne({ 'id': id });

            if (!resultado) {
                res.status(404).json({ mensagem: `Produto com ID: ${id} não encontrado!` })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar busca por ID.' })
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
    
        try {
            const produtoExistente = await produtoModel.findOne({ 'id': id });
    
            if (!produtoExistente) {
                res.status(404).json({ mensagem: `Nenhum produto com o ID: ${id} encontrado para alteração!` });
                return;
            }
    
            const _id = String(produtoExistente._id);
            const atualizacao = req.body;

            // Verifica se há um campo 'imagem' na requisição PUT
            if (req.body.imagem) {
                try {
                    const imagemPath = req.body.imagem;
                    const imagemData = fs.readFileSync(imagemPath);
    
                    // Atualiza os dados da imagem no objeto de atualização
                    atualizacao.imagem = {
                        data: imagemData,
                        contentType: 'image/jpg' // Substitua pelo tipo de conteúdo correto da sua imagem
                    };
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ mensagem: 'Erro ao carregar a imagem.' });
                    return;
                }
            }            
    
            await produtoModel.findByIdAndUpdate(String(_id), atualizacao);
    
            res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao realizar alteração de produto.' });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;

        try {
            const _id = String((await produtoModel.findOne({ 'id': id }))._id);
            await produtoModel.findByIdAndRemove(String(_id));

            if (!_id) {
                res.status(404).json({ mensagem: `Nenhum produto com o ID: ${_id} encontrado para ser excluido!` })
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
