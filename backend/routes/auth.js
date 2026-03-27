var express = require('express');
var router = express.Router();
const { loginController, registerController } = require('../controllers/authController');

router.post('/login', loginController);
router.post('/register', registerController);
module.exports = router;
