require("./mongodb");
const mongoose = require("mongoose");
const fs = require('fs');

const clienteModel = require("../models/clienteModel");
const clientes = require("./clientes.json");

const categoriaModel = require("../models/categoriaModel");
const produtoModel = require("../models/produtoModel");

const categorias = require("./categorias.json");
const produtos = require("./produtos.json");

const pedidoModel = require("../models/pedidoModel");
const pedidos = require("./pedidos.json");

const auth = require('../auth/auth');

const path = require('path');
const caminhoImagens = path.join(__dirname, '../imagens');

async function carregarDados() {
    try {
        await clienteModel.deleteMany({});
        for (const cliente of clientes) {

            // Carregar a imagem do arquivo
            const arquivoBuffer = fs.readFileSync(caminhoImagens + cliente.imagem);
            cliente.imagem = arquivoBuffer;

            // Criptografar a senha antes de salvar no banco de dados
            clienteModel.create(await auth.gerarHash(cliente));
        }
        console.log("Carga de clientes concluída!");

        await categoriaModel.deleteMany({});
        for (const categoria of categorias) {
            await categoriaModel.create(categoria);
        }
        console.log("Carga de categorias concluída!");

        await produtoModel.deleteMany({});
        for (const produto of produtos) {
            const categoria = await categoriaModel.findOne({ cod: produto.categoria });
            produto.categoria = categoria._id;

            // Carregar a imagem do arquivo
            const arquivoBuffer = fs.readFileSync(caminhoImagens + produto.imagem);
            produto.imagem = arquivoBuffer;

            await produtoModel.create(produto);
        }
        console.log("Carga de produtos concluída!");

        await pedidoModel.deleteMany({});
        for (const pedido of pedidos) {
            const cliente = await clienteModel.findOne({ cod: pedido.cliente });
            pedido.cliente = cliente._id;

            for (const item of pedido.listaProdutos) {
                const produto = await produtoModel.findOne({ cod: item.produto });
                item.produto = produto._id;
            }

            await pedidoModel.create(pedido);
        }
        console.log("Carga de pedidos concluída!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

carregarDados();