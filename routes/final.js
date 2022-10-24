const express = require('express');
const router = express.Router();
const controller = require('../controllers/finalController');

router.get('/', controller.renderFinalView);
module.exports = router;