const { verifyToken } = require('../utils/jwt');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }
  
  const result = verifyToken(token);
  
  if (!result.valid) {
    return res.status(403).json({
      success: false,
      message: result.message
    });
  }
  
  req.user = result.decoded;
  next();
};

module.exports = {
  authenticateToken
};