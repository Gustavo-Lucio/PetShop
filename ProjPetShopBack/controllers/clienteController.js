const clienteModel = require('../models/clienteModel');
const fs = require('fs');

class ClienteController {

    async cadastrar(req, res) {
        let cliente = req.body;

        try {

            // Obter os dados da imagem
            const imagemPath = req.body.imagem;
            const imagemData = fs.readFileSync(imagemPath);

            // Definir os dados da imagem no objeto do cliente
            cliente.imagem = {
                data: imagemData,
                contentType: 'image/jpg' // Substitua pelo tipo de conteúdo correto da sua imagem
            };

            const max = await clienteModel.findOne({}).sort({ id: -1 });
            cliente.id = max == null ? 1 : max.id + 1;
            const resultado = await clienteModel.create(cliente);
            res.status(201).json(resultado);

        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar cadastro do cliente.' })
        }
    }

    async listar(req, res) {

        try {
            const resultado = await clienteModel.find({});

            if (!resultado) {
                res.status(404).json({ mensagem: 'Nenhum cliente encontrado!' })
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
            const resultado = await clienteModel.findOne({ 'id': id });

            if (!resultado) {
                res.status(404).json({ mensagem: `cliente com ID: ${id} não encontrado!` })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar busca por ID.' })
        }
    }

    async buscarPorEmail(req, res) {
        const nome = req.params.nome;

        try {
            const resultado = await clienteModel.findOne({ 'nome': nome });

            if (!resultado) {
                res.status(404).json({ mensagem: `Nenhum cliente com nome: ${nome} encontrado!` })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar busca por nome.' })
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
    
        try {
            const clienteExistente = await clienteModel.findOne({ 'id': id });
    
            if (!clienteExistente) {
                res.status(404).json({ mensagem: `Nenhum cliente com o ID: ${id} encontrado para alteração!` });
                return;
            }
    
            const _id = String(clienteExistente._id);
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
    
            await clienteModel.findByIdAndUpdate(String(_id), atualizacao);
    
            res.status(200).json({ mensagem: 'Cliente atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao realizar alteração de cliente.' });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;

        try {
            const _id = String((await clienteModel.findOne({ 'id': id }))._id);
            await clienteModel.findByIdAndRemove(String(_id));

            if (!_id) {
                res.status(404).json({ mensagem: `Nenhum cliente com o ID: ${_id} encontrado para ser excluido!` })
            } else {
                res.status(200).json({ mensagem: `cliente excluido com sucesso` });
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao excluir o cliente.' })
        }
    }
}

module.exports = new ClienteController();
