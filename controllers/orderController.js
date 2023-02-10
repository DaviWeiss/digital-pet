const database = require("../database/models");
var express = require('express');

async function getProducts(id, req, res) {
    const pedido = await database.OrderDetail.findOne({
        where: {
            id
        },
        include: {
            model: database.Product,
            as: "order_products",
            required: true
        }
    });
    return pedido;
};

async function getUserRequests(id){
    const pedidos = await database.OrderDetail.findAll({
        where: { user_id: id },
    });
    return pedidos;
}

const orderController = {
    renderRequestsView: async function(req, res){
        const id = req.session.userLogged.id;
        const requests = await getUserRequests(id);
        res.render("pedidos", { requests });
    },

    showProducts: async function(req, res){
        const { id } = req.params;

        const pedido = await getProducts(id, req, res); 

        return res.render('pedido-detalhes', { pedido });
    }
}

module.exports = orderController;