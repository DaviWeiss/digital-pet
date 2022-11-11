const fs = require("fs");

const fileName = "database/product.json";

const Product = {
    getProducts: function(){
        return productList = JSON.parse(fs.readFileSync(fileName, "utf-8"))
    },
    getProductById: function(id){
        let productList = this.getProducts();
        let productFound = productList.find(product =>{
            product.id === id
        });

        return productFound;
    },

    getProductByFieldName: function(fieldName, value){
        let productList = this.getProducts();
        let productFound = productList.find(product => {
            product[fieldName] === value;
        });

        return productFound;
    },

    editProduct: function(id, newData){
        let productList = this.getProducts();
        let productIndex = productList.findIndex(product => product.id === id);
        let productFound = productList.find(product => product.id === id);

        productList[productIndex] = {
            id: productFound.id,
            ...newData
        }

        fs.writeFileSync(fileName, JSON.stringify(productList, null, ' '));
    },
    generateId: function(){
        let productList = this.getProducts();
        let lastProduct = productList.pop();
        if(lastProduct){
            return lastProduct.id + 1;
        }

        return 1;
    },

    createProduct: function(data){
        let productList = this.getProducts();
        let newProduct = {
            id: this.generateId(),
            ...data
        }

        productList.push(newProduct);

        fs.writeFileSync(fileName, JSON.stringify(productList, null, ' '));
    },

    deleteProduct: function(id){
        let productList = this.getProducts();
        let newProductList = productList.filter(product => product.id !== id);
        fs.writeFileSync(fileName, JSON.stringify(newProductList, null, ' '))
    }
}

module.exports = Product;