const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidosController');

router.get('/', controller.renderPedidosView);
module.exports = router;