const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/:id/detalhe', controller.renderDetailProductView);

router.get('/lista-produtos', controller.renderProductListView);

router.get('/carrinho', controller.renderCarView);

router.get('/:id/carrinho', controller.renderCarViewAfterChoosingAnyProduct);

router.post('/carrinho/desconto', controller.renderCarViewWithDiscount);

router.get('/checkout', controller.renderCheckoutView);

router.post('/finalizar', controller.finalize);

router.put('/:id/adicionar', controller.addQuantityToProduct);

router.put('/:id/excluir', controller.removeProduct);

module.exports = router;