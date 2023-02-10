const database = require("../database/models");
var express = require('express');

async function getProducts() {
    const products = await database.Product.findAll();
    return products;
};

async function getUserByEmail(email, req, res){
    const user = await database.User.findOne({
        where: {
            email: email,
        }
    });
    return user;
};

const othersController = {
    renderHomeView: async function(req, res){
        res.clearCookie('isOrdering');
        res.clearCookie('gettingPlan');
        if(req.session.userLogged == undefined){
            res.clearCookie('token');
        }
        const productList = await getProducts();
        res.render("home", { productList });
    },

    renderAboutUsView: function(req, res){
        res.render('contact-about');
    },

    receiveNewsUser: async function(req, res){
        const userLogged = req.session.userLogged;
        const { email, name } = req.body;
        const user = await getUserByEmail(email, req, res);
        let new_and_promotion;
        if(user && userLogged == undefined){
            return res.render('login');
        }else if(user && userLogged != undefined){
            try{
                if(userLogged.email != email){
                    return res.render('final', { title: "Erro de processamento!!!", 
                    description: "O e-mail precisa ser o mesmo do usuário logadox'" });
                }else{
                    new_and_promotion = await database.NewAndPromotion.create({
                        email: email,
                        user_name: name,
                        user_id: userLogged.id
                    });
                    if(new_and_promotion){
                        return res.render('final', { title: "Solicitação enviada com sucesso!!!", 
                        description: "Agora você irá receber promoções e novidades da DigitalPet em primeira mão" });
                    }
                }
            }
            catch(error){
                return res.render('final', { title: "Erro de processamento!!!", 
                description: "Se você já cadastrou seu e-mail, não é possível fazer um novo cadastro. Caso contrário, tente novamente mais tarde." });
            }
        }else {
            return res.render("register");
        }
    },
}

module.exports = othersController;