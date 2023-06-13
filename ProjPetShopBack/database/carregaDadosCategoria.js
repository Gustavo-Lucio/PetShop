require("./mongodb");
const mongoose = require("mongoose");

const categoriaModel = require("../models/categoriaModel");
const categorias = require("./categorias.json");

async function carregarDadosCategoria() {
    try {
        await categoriaModel.deleteMany({});

        for (const categoria of categorias) {
            await categoriaModel.create(categoria);
        }
        console.log("Carga inicial de categoria feita!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

carregarDadosCategoria();
