const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsListController');

router.get('/', controller.renderProductListView);
module.exports = router;