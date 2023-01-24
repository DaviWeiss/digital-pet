const ProductModel = require("../models/Product");

const othersController = {
    renderHomeView: function(req, res){
        const productList = ProductModel.getProducts();
        res.render("home", { productList });
    }
}

module.exports = othersController;