const produtoModel = require('../models/produtoModel');
const categoriaModel = require("../models/categoriaModel");

const fs = require('fs');

class ProdutoController {

    async cadastrar(req, res) {
        const max = await produtoModel.findOne({}).sort({ cod: -1 })

        let produto = req.body;
        const arquivo = req.file.buffer;
        produto.imagem = arquivo
        // produto.cod = max == null ? 1 : max.cod +1

        const resultado = await produtoModel.create(produto);
        res.status(201).json(resultado);


        // try {
        //     await categoriaModel.findOne({ cod: produto.categoria })
        //         .then((categoria) => {produto.categoria = categoria._id;
        //             return produto;
        //         })
        //         .then(async (produto) => {

        //             // Obter os dados da imagem
        //             const imagemPath = produto.imagem.data;
        //             const imagemData = fs.readFileSync(imagemPath);
        //             const imagemBase64 = imagemData.toString('base64');

        //             // Definir os dados da imagem no objeto do produto
        //             produto.imagem = {
        //                 data: imagemBase64,
        //                 contentType: 'image/jpg' // Substitua pelo tipo de conteúdo correto da sua imagem
        //             };

        //             // await produtoModel.create(produtoAlterado);
        //             const max = await produtoModel.findOne({}).sort({ cod: -1 });
        //             produto.cod = max == null ? 1 : max.cod + 1;
        //             const resultado = await produtoModel.create(produto);
        //             res.status(201).json(resultado);
        //         });

        // } catch (error) {
        //     console.error(error)
        //     res.status(500).json({ mensagem: 'Erro ao realizar cadastro do produto.' })
        // }
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

    async atualizar(req, res) {
        const cod = req.params.cod;

        try {
            const produtoExistente = await produtoModel.findOne({ 'cod': cod });

            if (!produtoExistente) {
                res.status(404).json({ mensagem: `Nenhum produto com o codigo: ${cod} encontrado para alteração!` });
                return;
            }

            const _id = String(produtoExistente._id);
            const atualizacao = req.body;

            // Verifica se há um campo 'imagem' na requisição PUT
            if (req.body.imagem) {
                try {


                    // Obter os dados da imagem
                    const imagemPath = atualizacao.imagem.data;
                    const imagemData = fs.readFileSync(imagemPath);

                    // Definir os dados da imagem no objeto do produto
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

            await categoriaModel.findOne({ cod: atualizacao.categoria })
                .then((categoria) => {
                    atualizacao.categoria = categoria._id;
                    return atualizacao;
                })

            await produtoModel.findByIdAndUpdate(String(_id), atualizacao);

            res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
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
