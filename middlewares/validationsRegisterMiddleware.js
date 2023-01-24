const { check } = require('express-validator');

//Rejex
const rejexEmail = /\S+@\S+\.\S+/;
const rejexCpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"'%$*&@#])[0-9a-zA-Z!"'%$*&@#]{8,}$/; 

module.exports = [
    check('email').trim()
        .notEmpty().withMessage('O e-mail não pode ser vazio').bail()
        .matches(rejexEmail).withMessage("O e-mail inserido é inválido"),
    check('name').trim()
        .notEmpty().withMessage('O nome não pode ser vazio').bail()
        .isLength({ min: 3 }).withMessage("Por favor, informe um nome válido"),
    check('lastName').trim()
        .notEmpty().withMessage('O sobrenome não pode ser vazio').bail()
        .isLength({ min: 3 }).withMessage("Por favor, informe um sobrenome válido"),
    check('CPF').trim()
        .notEmpty().withMessage('O CPF não pode ser vazio').bail()
        .matches(rejexCpf).withMessage("O CPF inserido é inválido"),
    check('celular').trim()
        .notEmpty().withMessage('O celular não pode ser vazio'),
    check('password').trim()
        .matches(regexPassword).withMessage("A senha inserida é inválida"),
    check('confirmPassword').trim()
        .notEmpty().withMessage('O campo de confirmação de senha não pode ser vazio').bail()
        .custom(async (value, { req }) => {
            const password = req.body.password;
            if(value !== password){
                throw new Error('As senhas precisam ser iguais');
            }
        })
];