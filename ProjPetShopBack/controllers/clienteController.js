const clienteModel = require('../models/clienteModel');
const fs = require('fs');
const auth = require('../auth/auth')

class ClienteController {

    async cadastrar(req, res) {


        try{
        const max = await clienteModel.findOne({}).sort({ cod: -1 })
        
        let { nome, endereco, telefone, cpf, nomeCartao, numeroCartao, cvcCartao, email, senha } = req.body;
        let imagem = req.file.buffer;

        const cliente = new clienteModel({
            cod : max == null ? 1 : max.cod +1,
            nome, 
            endereco, 
            telefone, 
            cpf, 
            nomeCartao, 
            numeroCartao, 
            cvcCartao, 
            email, 
            senha,
            imagem : Buffer.from(imagem,'base64'),
        })

       const resultado = clienteModel.create(await auth.gerarHash(cliente))

        res.status(201).json(resultado);

    }catch (error){
        console.error(error);
        res.status(500).json({mensagem: 'Erro ao cadastrar o produto.'})}
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

    async buscarPorCod(req, res) {
        const cod = req.params.cod;

        try {
            const resultado = await clienteModel.findOne({ 'cod': cod });

            if (!resultado) {
                res.status(404).json({ mensagem: `cliente com codigo: ${cod} não encontrado!` })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar busca por codigo.' })
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
        const cod = req.params.cod;

        try {
            const clienteExistente = await clienteModel.findOne({ 'cod': cod });

            if (!clienteExistente) {
                res.status(404).json({ mensagem: `Nenhum cliente com o codigo: ${cod} encontrado para alteração!` });
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
        const cod = req.params.cod;

        try {
            const _id = String((await clienteModel.findOne({ 'cod': cod }))._id);
            await clienteModel.findByIdAndRemove(String(_id));

            if (!_id) {
                res.status(404).json({ mensagem: `Nenhum cliente com o cod: ${cod} encontrado para ser excluido!` })
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
