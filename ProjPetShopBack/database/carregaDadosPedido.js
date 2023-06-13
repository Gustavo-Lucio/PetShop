require("./mongodb");
const mongoose = require("mongoose");

const pedidoModel = require("../models/pedidoModel");
const pedidos = require("./pedidos.json");

async function carregarDadosPedido() {
    try {
        await pedidoModel.deleteMany({});

        for (const pedido of pedidos) {
            await pedidoModel.create(pedido);
        }
        console.log("Carga inicial de pedidos feita!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

carregarDadosPedido();
