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
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "order_product",
        timestamps: false
    } 
    );
    
    return OrderProduct;
}