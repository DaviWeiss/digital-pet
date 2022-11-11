const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator');
const userController = {
    renderLoginView: function(req, res){
        res.render('login');
    },

    renderRegisterView: function(req, res) {
        res.render('register');
    },

    createUser: function(req, res){
        const resultValidations = validationResult(req);
        if(resultValidations.errors.length > 0){
            return res.render('register', {
                errors: resultValidations.mapped(),
                oldData: req.body
            });
        }else{
            let { CPF, celular } = req.body
            CPF = CPF.replace(".", "").replace(".", "").replace("-", "").replace(" ", "");
            celular = celular.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
            let hashPass = bcrypt.hashSync(req.body.password, 10);
            let hashConfirmPass = bcrypt.hashSync(req.body.confirmPassword, 10);
            
            let newUser = {
                ...req.body,
                CPF: CPF,
                celular: celular,
                password: hashPass,
                confirmPassword: hashConfirmPass
            }
    
            UserModel.createUser(newUser);
            console.log('teste')
            return res.render('final', { 
                title: "Usuário criado com sucesso!!!", 
                description: "Agora você pode realizar pedidos com a gente e participar de vários benefícios" })
        }
    }
}

module.exports = userController;