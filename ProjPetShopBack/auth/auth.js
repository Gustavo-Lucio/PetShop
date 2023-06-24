const jwt = require('jsonwebtoken');
const auth = require('./app.json');

const bcryptjs = require('bcryptjs');
// Função assíncrona para incluir um token no objeto do cliente
async function incluirToken(cliente){
  // Gera um token usando o pacote jwt.sign
  const token = await jwt.sign({cod: cliente.cod}, auth.appId, {
    expiresIn: 3600 // Expira em 3600 segundos ou 1 hora.
  });
  // Atribui o token gerado ao objeto cliente
  cliente.token = token;
  cliente.senha = undefined;
}
// Função assíncrona para gerar o hash da senha do cliente
async function gerarHash(cliente){
  if (typeof cliente.senha !== 'undefined') {
    // Gera o hash da senha usando o pacote bcryptjs.hash
    const hash = await bcryptjs.hash(cliente.senha, 10);
    // Atribui o hash gerado à senha do cliente
    cliente.senha = hash;
  }
  return cliente;
}
// Middleware de autorização
function autorizar(req, res, next){
  const authHeader = req.headers.authorization;

  if (!authHeader){
    return res.status(401).send({error: 'O token não foi enviado!'});
  }

  const partes = authHeader.split(' ');

  if (partes && partes.length !== 2){
    return res.status(401).send({error: 'Token incompleto!'});
  }

  const [tipo, token] = partes;

  if (!/^Bearer$/i.test(tipo)){
    return res.status(401).send({error: 'Token mal formado!'});
  }
  // Verifica a validade do token usando o pacote jwt.verify
  jwt.verify(token, auth.appId, (err, cliente) => {
    if (err) {
      return res.status(401).send({error: 'Token inválido!'});
    }
    req.clienteLogadoId = cliente.id;
    return next();
  });
}
// Exporta as funções e o middleware para uso em outros módulos
module.exports = {
  gerarHash,
  incluirToken,
  autorizar,
};
