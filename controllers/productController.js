const database = require("../database/models");

async function getProductDetail(id, req, res){
    const product = await database.Product.findByPk(id);
    return product;
};

async function getProducts() {
    const products = await database.Product.findAll();
    return products;
};

function saveCartProduct(productDetail, req, res){
    let productList = [];
    let productsName = [];
    const cartItems = req.session.cartItems;
    if(cartItems){
        cartItems.map(element => {
            productsName.push(element.name);
        });
        if(productsName.indexOf(productDetail.name) > -1){
            cartItems.map(element => {
                if(element.name == productDetail.name){
                    element.quantity = element.quantity + 1;
                }
                productList.push(element);
            });
        }else{
            cartItems.map(element => {
                productList.push(element);
            });
            productDetail.quantity = 1;
            productList.push(productDetail);
        }
    }else {
        productDetail.quantity = 1;
        productList.push(productDetail);
    }
    
    req.session.cartItems = productList;
    return req.session.cartItems;
};

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
};
  
function formatDate(date) {
    return (
        [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear()
        ].join('/')
    );
};

async function finalizeProcess(req, res){
    try{
        let id = req.session.userLogged != undefined ? req.session.userLogged.id : null;
        const order = await database.OrderDetail.create({
            order_date: formatDate(new Date()),
            address: req.session.address.end,
            complement: req.session.address.comp,
            cep: req.session.address.cep,
            payment_type: "CARTÃO",
            order_value: req.session.totalValueAsString,
            status: "APROVADO",
            user_id: id,
        });
        
        req.session.cartItems.forEach(async element => {
            await database.OrderProduct.create({
                order_id: order.id,
                product_id: element.id
            })
        });
        
        return res.render('final', { 
            title: "Pedido concluído com sucesso!!!", 
            description: 'Para visualizar os detalhes do pedido, basta ir até a página "Minha conta" e acessar "Meus Pedidos".'})
    }catch(error){
        return res.render('final', { 
            title: "Não foi possível fazer o pedido!!!", 
            description: "Por favor, tente novamente mais tarde." })
    }
};

const productController = {
    renderDetailProductView: async function(req, res){
        const { id } = req.params;
        const productDetail = await getProductDetail(id, req, res);
        const productList = await getProducts();
        res.render('product-detail', { productDetail, productList });
    },

    renderProductListView: async function(req, res){
        const productList = await getProducts();
        res.render('products-list', { productList });
    },

    renderCarViewAfterChoosingAnyProduct: async function(req, res){
        let totalValue = 0.0;
        let totalValueAsString;
        const { id } = req.params;
        const productDetail = await getProductDetail(id, req, res);
        const cartItems = saveCartProduct(productDetail.dataValues, req, res);
        cartItems.forEach((cartItem) => {
            let value = parseFloat(cartItem.value.replace("R$ ", "").replace(",", "."));
            totalValue = totalValue + (value * cartItem.quantity);
            totalValueAsString = totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        });
        req.session.totalValue = totalValue;
        req.session.cartItems = cartItems;
        req.session.totalValueAsString = totalValueAsString;
        req.session.hasDiscount = false;
        req.session.subTotal = totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        //res.render('carrinho', { cartItems, totalValueAsString, subTotal: req.session.subTotal, hasDiscount: req.session.hasDiscount});
        res.redirect('/produtos/carrinho')
    },

    renderCarView: function(req, res){
        res.render('carrinho', 
        { 
            cartItems: req.session.cartItems, 
            totalValueAsString: req.session.totalValueAsString, 
            subTotal: req.session.subTotal, 
            hasDiscount: req.session.hasDiscount
        });
    },

    renderCarViewWithDiscount: async function(req, res){
        const { discount } = req.body;
        let totalValue = 0.0;
        if(discount.toUpperCase() == "DIGITAL10"){
            totalValue = req.session.totalValue;
            req.session.hasDiscount = true;
            totalValue = totalValue - (totalValue * 0.1);
            req.session.totalValue = totalValue;
            let totalValueAsString = totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            req.session.totalValueAsString = totalValueAsString;
            res.render("carrinho", { cartItems: req.session.cartItems, totalValueAsString: req.session.totalValueAsString, subTotal: req.session.subTotal, hasDiscount: req.session.hasDiscount});
        }else{
            req.session.hasDiscount = false;
            res.render("carrinho", { cartItems: req.session.cartItems, totalValueAsString: req.session.totalValueAsString, subTotal: req.session.subTotal, hasDiscount: req.session.hasDiscount});
        }
    },

    renderCheckoutView: function(req, res){
        if(res.locals.user.plan_id == 4 || res.locals.user == "empty"){
            let totalValue = req.session.totalValue;
            totalValue = totalValue + 10.00;
            req.session.totalValue = totalValue;
            let totalValueAsString = totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            req.session.totalValueAsString = totalValueAsString;
        }
        res.render('checkout', { cartItems: req.session.cartItems, subTotal: req.session.subTotal, totalValueAsString: req.session.totalValueAsString, hasDiscount: req.session.hasDiscount});
    },

    finalize: async function(req, res){
        let { cep, bairro, end, num, comp } = req.body;
        let address = {
            cep,
            bairro,
            end,
            num,
            comp
        };
        req.session.address = address;
        await finalizeProcess(req, res);
        
    },

    addQuantityToProduct: async function(req, res){
        const { id } = req.params;
        const cartItems = req.session.cartItems;
        let totalValue = req.session.totalValue;
        let totalValueAsString;
        cartItems.forEach((element) => {
            if(element.id == id){
                let value = parseFloat(element.value.replace("R$ ", "").replace(",", "."));
                element.quantity = element.quantity + 1;
                totalValue = totalValue + value;
            }
            if(req.session.hasDiscount){
                totalValue = totalValue - (totalValue * 0.1);
            }
            totalValueAsString = totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        });

        req.session.totalValue = totalValue;
        req.session.totalValueAsString = totalValueAsString;
        req.session.subTotal = totalValueAsString;
        req.session.cartItems = cartItems;
        res.redirect('/produtos/carrinho');
    },

    removeProduct: async function(req, res){
        const { id } = req.params;
        const cartItems = req.session.cartItems;
        let totalValue = req.session.totalValue;
        let totalValueAsString;
        cartItems.forEach((element) => {
            if(element.id == id){
                let value = parseFloat(element.value.replace("R$ ", "").replace(",", "."));
                totalValue = totalValue - (value * element.quantity);
                let indice = cartItems.indexOf(element);
                cartItems.splice(indice, 1);
            }
            if(req.session.hasDiscount){
                totalValue = totalValue - (totalValue * 0.1);
            }
            totalValueAsString = totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        });

        req.session.totalValue = totalValue;
        req.session.totalValueAsString = totalValueAsString;
        req.session.subTotal = totalValueAsString;
        req.session.cartItems = cartItems;
        res.redirect('/produtos/carrinho');
    }
}

module.exports = productController;