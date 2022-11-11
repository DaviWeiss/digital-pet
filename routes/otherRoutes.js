const express = require('express');
const router = express.Router();
const controller = require('../controllers/othersController');

router.get('/', controller.renderHomeView);
module.exports = router;