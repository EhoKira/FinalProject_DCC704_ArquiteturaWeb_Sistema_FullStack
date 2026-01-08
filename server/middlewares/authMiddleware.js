const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o token foi enviado
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Formato esperado: "Bearer TOKEN"
  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Token mal formatado' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca o usuário no banco (segurança extra)
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Anexa o usuário à requisição
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;