const express = require('express');
const router = express.Router();
const controller = require('../controllers/productDetailController');

router.get('/', controller.renderProductDetailView);
module.exports = router;