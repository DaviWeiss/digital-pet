const ProductModel = require("../models/Product");

function renderHomeView(req, res, next) {
	const productList = ProductModel.getProducts();
	res.render("home", { productList });
}

module.exports = {
	renderHomeView
}