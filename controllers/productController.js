const ProductModel = require("../models/Product");

const productController = {
    renderDetailProductView: function(req, res){
        const { id } = req.params;
        const productsList = ProductModel.getProducts();
        const productDetail = ProductModel.getProductById(Number(id));
        const benefits = productDetail.benefits.split(";");
        console.log(benefits)
        res.render('product-detail', { productsList, productDetail, benefits});
    },
}
module.exports = productController;