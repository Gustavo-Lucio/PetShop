const pedidoModel = require('../models/pedidoModel');
const clienteModel = require('../models/clienteModel');
const produtoModel = require('../models/produtoModel');
const fs = require('fs');

class PedidoController {

    // async gerarPedido(req, res) {
    //     let pedido = req.body;

    //     try {
    //         const max = await pedidoModel.findOne({}).sort({ id: -1 });
    //         pedido.id = max == null ? 1 : max.id + 1;
    //         const resultado = await pedidoModel.create(pedido);
    //         res.status(201).json(resultado);

    //     } catch (error) {
    //         console.error(error)
    //         res.status(500).json({ mensagem: 'Erro ao realizar cadastro do pedido.' })
    //     }
    // }

    async gerarPedido(req, res) {
        try {
          const { clienteId, listaProdutos } = req.body;
      
          // Verificar se o cliente existe
          const cliente = await clienteModel.findById(clienteId);
          if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
          }
      
          // Verificar se os produtos existem
          const produtos = await produtoModel.find({ _id: { $in: listaProdutos.map(item => item.produto) } });
          if (produtos.length !== listaProdutos.length) {
            return res.status(404).json({ error: 'Um ou mais produtos não encontrados' });
          }
      
          // Calcular o preço total do pedido
          const precoTotal = listaProdutos.reduce((total, item) => {
            const produto = produtos.find(p => p._id.toString() === item.produto.toString());
            return total + (produto.preco * item.quantidade);
          }, 0);
      
          // Criar o objeto do pedido
          const pedido = new pedidoModel({
            cliente: cliente._id,
            listaProdutos,
            precoTotal,
            status: 'Aguardando Pagamento'
          });
      
          // Salvar o pedido no banco de dados
          const pedidoSalvo = await pedido.save();
      
          // Retornar o pedido criado
          return res.json(pedidoSalvo);
        } catch (error) {
          return res.status(500).json({ error: `Erro ao gerar o pedido: ${error.message}` });
        }
      }


    async listar(req, res) {

        try {
            const resultado = await pedidoModel.find({});

            if (!resultado) {
                res.status(404).json({ mensagem: 'Nenhum pedido encontrado!' })
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
            const resultado = await pedidoModel.findOne({ 'id': id });

            if (!resultado) {
                res.status(404).json({ mensagem: `Pedido com ID: ${id} não encontrado!` })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar busca por ID.' })
        }
    }

    async buscarPorStatus(req, res) {
        const status = req.params.status;

        try {
            const resultado = await pedidoModel.find({ 'status': status });

            if (!resultado) {
                res.status(404).json({ mensagem: `Nenhum pedido com o status da conta: ${status} encontrado!` })
            } else {
                res.status(200).json(resultado);
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao realizar busca por status.' })
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
    
        try {
            const pedidoExistente = await pedidoModel.findOne({ 'id': id });
    
            if (!pedidoExistente) {
                res.status(404).json({ mensagem: `Nenhum pedido com o ID: ${id} encontrado para alteração!` });
                return;
            }
    
            const _id = String(pedidoExistente._id);
            const atualizacao = req.body;
    
            await pedidoModel.findByIdAndUpdate(String(_id), atualizacao);
    
            res.status(200).json({ mensagem: 'Pedido atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao realizar alteração de pedido.' });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;

        try {
            const _id = String((await pedidoModel.findOne({ 'id': id }))._id);
            await pedidoModel.findByIdAndRemove(String(_id));

            if (!_id) {
                res.status(404).json({ mensagem: `Nenhum pedido com o ID: ${_id} encontrado para ser excluido!` })
            } else {
                res.status(200).json({ mensagem: `Pedido excluido com sucesso` });
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ mensagem: 'Erro ao excluir o pedido.' })
        }
    }
}

module.exports = new PedidoController();
