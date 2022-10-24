const fs = require("fs");

function Product(image, name, value, description, type){
    this.image = image;
    this.name = name;
    this.value = value;
    this.description = description;
    this.type = type;
}


function getProducts(){
    const productsList = JSON.parse(fs.readFileSync("database/product.json", "utf-8"));

    return productsList.map(
        (product) =>
            new Product
            (
                product.image,
                product.name,
                product.value,
                product.description,
                product.type
            )
    );
}


module.exports = {
    getProducts
}