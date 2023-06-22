const produtoModel = require('../models/produtoModel');
const categoriaModel = require('../models/categoriaModel');
const fs = require('fs');

class ProdutoController {
  async cadastrar(req, res) {
    const produto = req.body;

    try {
      const categoria = await categoriaModel.findOne({ cod: produto.categoria });
      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }

      produto.categoria = categoria._id;

      const imagem = req.file.buffer;
      produto.imagem = imagem;

      const resultado = await produtoModel.create(produto);
      res.status(201).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao realizar cadastro do produto' });
    }
  }

  async listar(req, res) {
    try {
      const resultado = await produtoModel.find({});
      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro durante a listagem' });
    }
  }

  async buscarPorCod(req, res) {
    const cod = req.params.cod;

    try {
      const resultado = await produtoModel.findOne({ cod });
      if (!resultado) {
        res.status(404).json({ mensagem: `Produto com código ${cod} não encontrado` });
      } else {
        res.status(200).json(resultado);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao realizar busca por código' });
    }
  }

  async atualizar(req, res) {
    const cod = req.params.cod;

    try {
      const produtoExistente = await produtoModel.findOne({ cod });
      if (!produtoExistente) {
        res.status(404).json({ mensagem: `Nenhum produto com o código ${cod} encontrado para alteração` });
        return;
      }

      const atualizacao = req.body;

      // Verifica se há um campo 'imagem' na requisição PUT
      if (req.file) {
        const arquivo = req.file.buffer;
        atualizacao.imagem = arquivo;
      }

      const categoria = await categoriaModel.findOne({ cod: atualizacao.categoria });
      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }

      atualizacao.categoria = categoria._id;

      await produtoModel.findOneAndUpdate({ cod }, atualizacao);
      res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao realizar alteração de produto' });
    }
  }

  async excluir(req, res) {
    const cod = req.params.cod;

    try {
      const produto = await produtoModel.findOneAndDelete({ cod });

      if (!produto) {
        res.status(404).json({ mensagem: `Nenhum produto com o código ${cod} encontrado para ser excluído` });
      } else {
        res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao excluir o produto' });
    }
  }
}

module.exports = new ProdutoController();