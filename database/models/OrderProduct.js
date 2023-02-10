const Product = require("./Product");

module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define("OrderProduct", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'order_detail',
                key: 'id'
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'product',
                key: 'id'
            }
        }
    },
    {
        tableName: "order_product",
        timestamps: false
    } 
    );

    return OrderProduct;
}