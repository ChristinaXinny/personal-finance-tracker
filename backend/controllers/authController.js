const { login, register } = require('../services/authService');

const loginController = async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }
  
  const result = await login(username, password);
  
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data
  });
};

const registerController = async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }
  
  const result = await register(username, password);
  
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data
  });
};
module.exports = {
  loginController,
  registerController
};