const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const validationsRegister = require('../middlewares/validationsRegisterMiddleware');
const validationsLogin = require('../middlewares/validationsLoginMiddleWare');
const userNotLoggedMiddleware = require('../middlewares/userNotLoggedMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

//Rotas de login
router.get('/login', userLoggedMiddleware, controller.renderLoginView);
router.post('/login', validationsLogin, controller.processLogin);

//Rotas de criar
router.get('/criar', userLoggedMiddleware, controller.renderRegisterView);
router.post('/criar', validationsRegister, controller.createUser);

//Rota para conta
router.get('/minha-conta', userNotLoggedMiddleware, controller.renderAccountView);

//Rota para editar
router.put('/:id/editar', userNotLoggedMiddleware, controller.editUser);
router.put('/plano/:id/finalizar', controller.updateUserPlan);

//Rota para deslogar 
router.get('/sair', controller.logOut);

module.exports = router;