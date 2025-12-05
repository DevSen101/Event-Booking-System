// src/middlewares/adminMiddleware.js

// Dummy admin check
const adminMiddleware = (req, res, next) => {
  const isAdmin = req.headers['x-admin'];
  if (isAdmin === 'true') {
    next();
  } else {
    return res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = adminMiddleware;
