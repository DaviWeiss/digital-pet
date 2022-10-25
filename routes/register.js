const express = require('express');
const router = express.Router();
const controller = require('../controllers/registerController');

router.get('/', controller.renderRegisterView);
router.post('/', controller.createUser);
module.exports = router;