const database = require("../database/models");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config/secrets");

async function getUserById(id, req, res){
    const user = await database.User.findByPk(id);
    return user;
};

async function getUserByEmail(email, req, res){
    const user = await database.User.findOne({
        where: {
            email: email,
        }
    });
    return user;
};

async function createUserAtDabase(user, res){
    try{
        await database.User.create({
            cpf: user.cpf,
            email: user.email,
            user_name: user.user_name,
            lastname: user.lastname,
            cell_phone: user.cell_phone,
            user_password: user.user_password,
            plan_id: user.plan_id
        })
    }catch(error){
        return res.render('final', { 
            title: "Não foi possível criar o usuário!!!", 
            description: "Um dos campos preenchidos, foi preenchido incorretamente ou de forma duplicada. Por favor, tente novamente." })
    }
};

async function editUserAtDatabase(id, data){
    await database.User.update({
        cpf: data.cpf,
        email: data.email,
        user_name: data.user_name,
        lastname: data.lastname,
        cell_phone: data.cell_phone,
        user_password: data.user_password,
        plan_id: data.plan_id
    }, {
        where: {id}
    });
};

async function editUserPlan(id, planId){
    console.log(id, "userId", planId, "planId")
    await database.User.update({
        plan_id: planId
    }, {
        where: {id}
    });
}

const userController = {
    renderAccountView: function(req, res){
        res.render('account');
    },
    
    renderLoginView: function(req, res){
        const lastPath = req.get('Referrer');
        if(lastPath.includes('produtos/checkout')){
            res.cookie("isOrdering", true);
        }else if(lastPath.includes('planos')){
            res.cookie("gettingPlan", true);
        }
        res.render('login');
    },

    renderRegisterView: function(req, res) {
        res.render('register');
    },

    createUser: async function(req, res){
        const resultValidations = validationResult(req);
        if(resultValidations.errors.length > 0){
            return res.render('register', {
                errors: resultValidations.mapped(),
                oldData: req.body
            });
        }else{
            let userExists = await getUserByEmail(req.body.email, req, res);
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
                    cpf: CPF,
                    email: email,
                    user_name: name,
                    lastname: lastName,
                    cell_phone: celular,
                    user_password: hashPass,
                    plan_id: 4
                }

                await createUserAtDabase(newUser, res);
                return res.render('final', { 
                    title: "Usuário criado com sucesso!!!", 
                    description: "Agora você pode realizar pedidos com a gente e participar de vários benefícios" })
            }    
        }
    },

    processLogin: async function(req, res){
        const resultValidations = validationResult(req);
        const { isOrdering, gettingPlan } = req.cookies;
        if(resultValidations.errors.length > 0){
            return res.render('login', {
                errors: resultValidations.mapped(),
                oldData: req.body
            });
        }else{
            let userToLogin = await getUserByEmail(req.body.email, req, res);
            if(userToLogin){
                let isPasswordVerified = bcrypt.compareSync(req.body.password, userToLogin.user_password);
                if(isPasswordVerified){
                    const email = req.body.email;
                    delete userToLogin.user_password;
                    req.session.userLogged = userToLogin;
                    if(req.body.rememberUser){
                        res.cookie('userEmail', email, { maxAge: (1000 * 60) * 30});
                    }
                    const token = jwt.sign({ email }, jwtKey, { expiresIn: "3h"});
                    res.cookie("token", token);
                    if(isOrdering){
                        res.clearCookie('isOrdering');
                        return res.redirect("/produtos/checkout");
                    }else if(gettingPlan){
                        const { planID } = req.cookies;
                        res.clearCookie('gettingPlan');
                        return res.redirect(`/planos/${planID}/checkout`);
                    }else {
                        return res.redirect("/usuario/minha-conta");
                    }
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

    editUser: async function(req, res){
        const { id } = req.params;
        const userFound = await getUserById(Number(id));
        
        let { email, name, lastName, cel } = req.body;
        
        let hashPass;

        if(req.body.password){
            hashPass = bcrypt.hashSync(req.body.password, 10);
        }else{
            hashPass = userFound.user_password;
        }

        let data = {
            cpf: userFound.cpf,
            email: email,
            user_name: name,
            lastname: lastName,
            cell_phone: cel,
            user_password: hashPass,
            plan_id: userFound.plan_id
        }

        await editUserAtDatabase(userFound.id, data);
        return res.render('final', { 
            title: "Usuário alterado com sucesso!!!", 
            description: "Para visualizar seus dados, basta ir para a tela de minha conta" })
    },

    updateUserPlan: async function(req, res){
        const userId = req.session.userLogged.id;
        const planIdBeforeUpdated = req.session.userLogged.plan_id;
        const { planID } = req.cookies;
        await editUserPlan(userId, planID);
        const user = await getUserById(userId, req, res);
        req.session.userLogged = user;
        if(planIdBeforeUpdated == 4){
            return res.render('final', { 
                title: "Plano comprado com sucesso!!!", 
                description: "Esperamos que aproveite muito os novos benefícios." })
        }else{
            return res.render('final', { 
                title: "Plano modificado com sucesso!!!", 
                description: "Esperamos que aproveite muito os novos benefícios." })
        };
    },

    logOut: function(req, res){
        res.clearCookie('userEmail');
        res.clearCookie('token');
        res.clearCookie('isOrdering');
        res.clearCookie('gettingPlan');
        res.clearCookie('planID');
        req.session.destroy();
        return res.redirect('/');
    },
}

module.exports = userController;