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

async function carregarDados() {
    try {
        await clienteModel.deleteMany({});
        for (const cliente of clientes) {
            // Obter os dados da imagem do cliente
            const imagemPath = cliente.imagem.data;
            const imagemData = fs.readFileSync(imagemPath);
          
            // Definir os dados da imagem no objeto do cliente
            cliente.imagem = {
              data: imagemData,
              contentType: 'image/jpg' // Substitua pelo tipo de conteúdo correto da sua imagem
            };
          
            await clienteModel.create(cliente);
          }


        await categoriaModel.deleteMany({});
        for (const categoria of categorias) {
            await categoriaModel.create(categoria);
        }
        console.log("Carga de categorias concluída!");


        await produtoModel.deleteMany({});
        for (const produto of produtos) {
            await categoriaModel
                .findOne({ cod: produto.categoria })
                .then((categoria) => {
                    produto.categoria = categoria._id;
                    return produto;
                })
                .then(async (produtoAlterado) => {

                    // Obter os dados da imagem
                    const imagemPath = produtoAlterado.imagem.data;
                    const imagemData = fs.readFileSync(imagemPath);

                    // Definir os dados da imagem no objeto do produto
                    produtoAlterado.imagem = {
                        data: imagemData,
                        contentType: 'image/jpg' // Substitua pelo tipo de conteúdo correto da sua imagem
                    };

                    await produtoModel.create(produtoAlterado);
                });
        }


        await pedidoModel.deleteMany({});
        for (const pedido of pedidos) {
            await clienteModel
                .findOne({ cod: pedido.cliente })
                .then((cliente) => {
                    pedido.cliente = cliente._id;
                    return pedido;
                })
                .then(async (pedidoAlterado) => {
                    // Iterar sobre a lista de produtos do pedido
                    for (const item of pedidoAlterado.listaProdutos) {
                        // Encontrar o objeto de produto correspondente pelo código
                        const produto = await produtoModel.findOne({ cod: item.produto });
                        // Substituir o valor de produto pelo _id correspondente
                        item.produto = produto._id;
                    }
                    await pedidoModel.create(pedidoAlterado);
                });
        }

        console.log("Carga de produtos concluída!");

    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

carregarDados();