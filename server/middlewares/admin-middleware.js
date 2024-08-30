const adminMiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      res.status(401).json({ message: "Access denied. User is not an admin." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;