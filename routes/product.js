const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

//Rotas de login
router.get('/:id/detalhe', controller.renderDetailProductView);

module.exports = router;