const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'Nenhum token fornecido.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyJWT;
