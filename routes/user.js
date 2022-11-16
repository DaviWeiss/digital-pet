const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const validationsRegister = require('../middlewares/validationsRegisterMiddleware');
const validationsLogin = require('../middlewares/validationsLoginMiddleWare');
const loggedUserMiddleware = require('../middlewares/loggedUserMiddleware');
const notLoggedUserMiddleware = require('../middlewares/notLoggedUserMiddleware');

//Rotas de login
router.get('/login', loggedUserMiddleware, controller.renderLoginView);
router.post('/login', validationsLogin, controller.processLogin);

//Rotas de criar
router.get('/criar', loggedUserMiddleware, controller.renderRegisterView);
router.post('/criar', validationsRegister, controller.createUser);

//Rota para conta
router.get('/minha-conta', notLoggedUserMiddleware, controller.renderAccountView);

//Rota para editar
router.put('/:id/editar', controller.editUser);

//Rota para deslogar 
router.get('/sair', controller.logOut);

module.exports = router;