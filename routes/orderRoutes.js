const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');
const userNotLoggedMiddleware = require('../middlewares/userNotLoggedMiddleware');

router.get('/', userNotLoggedMiddleware, controller.renderRequestsView);

router.get('/:id/produtos', userNotLoggedMiddleware, controller.showProducts);

module.exports = router;