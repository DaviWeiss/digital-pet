const express = require('express');
const router = express.Router();
const controller = require('../controllers/accountController');

router.get('/', controller.renderAccountView);
module.exports = router;