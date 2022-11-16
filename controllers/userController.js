const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const {validationResult} = require('express-validator');

const userController = {
    renderAccountView: function(req, res){
        res.render('account');
    },
    
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
            let userExists = UserModel.getUserByField('email', req.body.email);
            if(userExists){
                return res.render('register', {
                    errors: {
                        email: {
                            msg: "Este e-mail já está registrado"
                        }
                    },
                    oldData: req.body
                })
            }else {
                let { email, name, lastName, CPF, celular } = req.body;
                CPF = CPF.replace(".", "").replace(".", "").replace("-", "").replace(" ", "");
                celular = celular.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
                let hashPass = bcrypt.hashSync(req.body.password, 10);

                let newUser = {
                    CPF: CPF,
                    email: email,
                    name: name,
                    lastname: lastName,
                    celular: celular,
                    password: hashPass,
                }

                UserModel.createUser(newUser);
                return res.render('final', { 
                    title: "Usuário criado com sucesso!!!", 
                    description: "Agora você pode realizar pedidos com a gente e participar de vários benefícios" })
            }    
        }
    },

    processLogin: function(req, res){
        const resultValidations = validationResult(req);
        if(resultValidations.errors.length > 0){
            return res.render('login', {
                errors: resultValidations.mapped(),
                oldData: req.body
            });
        }else{
            let userToLogin = UserModel.getUserByField('email', req.body.email);

            if(userToLogin){
                let isPasswordVerified = bcrypt.compareSync(req.body.password, userToLogin.password);
                if(isPasswordVerified){
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    if(req.body.rememberUser){
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 30});
                    }
                    return res.redirect("/usuario/minha-conta");
                }
                else{
                    return res.render('login', {
                        errors: {
                            email: {
                                msg: "Usuário ou senha inválida"
                            }
                        },
                    });
                }
            }
            
            return res.render('login', {
                errors: {
                    email: {
                        msg: "Usuário ou senha inválida"
                    }
                },
            });
        }
    },

    editUser: function(req, res){
        const { id } = req.params;
        const userFound = UserModel.getUserById(Number(id));
        
        let { email, name, lastName, cel } = req.body;
        
        let hashPass;

        if(req.body.password){
            hashPass = bcrypt.hashSync(req.body.password, 10);
        }else{
            hashPass = userFound.password;
        }

        let data = {
            email: email,
            name: name,
            lastname: lastName,
            celular: cel,
            password: hashPass,
        }

        UserModel.editUser(userFound.id, data);
        return res.render('final', { 
            title: "Usuário alterado com sucesso!!!", 
            description: "Para visualizar seus dados, basta ir para a tela de minha conta" })
    },

    logOut: function(req, res){
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = userController;