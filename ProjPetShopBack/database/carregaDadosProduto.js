require("./mongodb");
const mongoose = require("mongoose");

const produtoModel = require("../models/produtoModel");
const produtos = require("./produtos.json");

async function carregarDadosProduto() {
    try {
        await produtoModel.deleteMany({});

        for (const produto of produtos) {
            await produtoModel.create(produto);
        }
        console.log("Carga inicial de produtos feita!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

carregarDadosProduto();
