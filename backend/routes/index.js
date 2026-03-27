var express = require('express');
var router = express.Router();
const { initDBController } = require('../controllers/indexController');

router.post('/init', initDBController);

module.exports = router;
