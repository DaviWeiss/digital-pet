const express = require('express');
const router = express.Router();
const controller = require('../controllers/checkoutController');

router.get('/', controller.renderCheckoutView);
module.exports = router;