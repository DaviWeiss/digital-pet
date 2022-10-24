const express = require('express');
const router = express.Router();
const controller = require('../controllers/plansController');

router.get('/', controller.renderPlansView);
module.exports = router;