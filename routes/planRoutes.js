const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const userNotLoggedMiddleware = require('../middlewares/userNotLoggedMiddleware');

//Todos os planos
router.get("/", planController.renderPlanView);
router.get("/:id/checkout", userNotLoggedMiddleware, planController.renderCheckoutPlanView);

module.exports = router;