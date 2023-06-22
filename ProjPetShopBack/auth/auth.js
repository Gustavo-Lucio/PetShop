const jwt = require('jsonwebtoken');
const auth = require('./app.json');

const bcryptjs = require('bcryptjs');

async function incluirToken(cliente){
  const token = await jwt.sign({cod: cliente.cod}, auth.appId, {
    expiresIn: 3600 // Expira em 3600 segundos ou 1 hora.
  });
  cliente.token = token;
  cliente.senha = undefined;
}

async function gerarHash(cliente){
  if (typeof cliente.senha !== 'undefined') {
    const hash = await bcryptjs.hash(cliente.senha, 10);
    cliente.senha = hash;
  }
  return cliente;
}

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

  jwt.verify(token, auth.appId, (err, cliente) => {
    if (err) {
      return res.status(401).send({error: 'Token inválido!'});
    }
    req.clienteLogadoId = cliente.id;
    return next();
  });
}

module.exports = {
  gerarHash,
  incluirToken,
  autorizar,
};
