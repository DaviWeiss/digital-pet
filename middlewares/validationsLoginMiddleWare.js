const { check } = require('express-validator');

//Rejex
const rejexEmail = /\S+@\S+\.\S+/;

module.exports = [
    check('email').trim()
        .notEmpty().withMessage('O e-mail não pode ser vazio').bail()
        .matches(rejexEmail).withMessage("O e-mail inserido é inválido"),
    check('password').trim()
        .notEmpty().withMessage("A senha não pode ser vazia"),
];