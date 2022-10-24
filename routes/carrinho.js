const express = require('express');
const router = express.Router();
const controller = require('../controllers/carrinhoController');

router.get('/', controller.renderCarrinhoView);
module.exports = router;