const express = require('express');
const router = express.Router();
const controller = require('../controllers/othersController');

router.get('/', controller.renderHomeView);

router.get('/contato-sobre-nos', controller.renderAboutUsView);

router.post('/receber-promocoes', controller.receiveNewsUser);

module.exports = router;