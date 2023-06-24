const clienteModel = require('../models/clienteModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {
    // Método para realizar o login do cliente
    async login(req, res) {
        const { email, senha } = req.body;
        // Encontra o cliente no banco de dados pelo email
        const cliente = await clienteModel.findOne({ 'email': email }).select('+senha');

        if (!cliente) {
            return res.status(400).send({ error: 'Usuário não encontrado!' });
        }
        // Verifica se a senha fornecida corresponde à senha armazenada
        if (!await bcryptjs.compare(senha, cliente.senha)) {
            return res.status(400).send({ error: 'Senha inválida!' });
        }
        // Inclui o token de autenticação para o cliente
        await auth.incluirToken(cliente);
        res.status(200).json(cliente);
    }
}

module.exports = new LoginController();
