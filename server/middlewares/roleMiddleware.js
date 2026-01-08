const roleMiddleware = (rolesPermitidos = []) => {
  return (req, res, next) => {
    // authMiddleware já garante que req.user existe
    if (!req.user || !rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Acesso negado: permissão insuficiente'
      });
    }

    next();
  };
};

module.exports = roleMiddleware;