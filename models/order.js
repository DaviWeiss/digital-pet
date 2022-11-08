const fs = require("fs");

function Order(id, date, value, status, listOfProducts){
    this.id = id;
    this.date = date;
    this.value = value;
    this.status = status;
    this.listOfProducts = listOfProducts;
}

function getOrder(){
    const productsList = JSON.parse(fs.readFileSync("database/order.json", "utf-8"));

    return productsList.map(
        (order) =>
            new Product
            (
                order.id,
                order.date,
                order.value,
                order.status,
                order.listOfProducts
            )
    );
}

module.exports = {
    getOrder
}