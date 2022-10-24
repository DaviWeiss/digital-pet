const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactAboutController');

router.get('/', controller.renderContactAboutView);
module.exports = router;