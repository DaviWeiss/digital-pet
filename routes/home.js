const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeController');

router.get('/', controller.renderHomeView);
module.exports = router;