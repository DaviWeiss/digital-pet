const ProductModel = require("../models/Product");

async function renderHomeView(req, res, next) {
	const productList = await ProductModel.getProducts();
	res.render("home", { productList });
}

module.exports = {
	renderHomeView
}