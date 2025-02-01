const checkRole = (roles) => {
    return (req, res, next) => {
        console.log(req.user)
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      next();
    };
  };
  
  module.exports = checkRole;