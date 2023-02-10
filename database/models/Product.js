const OrderProduct = require("./OrderProduct");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        value:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        benefits: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        sizes: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        specifications: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        composition: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        warranty_levels: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        enrichment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
    },
    {
        tableName: "product",
        timestamps: false
    } 
    );

    Product.associate = listaModelos => {
        Product.belongsToMany(listaModelos.OrderDetail, {
            as: "product_orders",
            through: "order_product",
            foreignKey: "product_id",
            otherKey: "order_id",
            timestamps: false
        });
    }
    
    return Product;
}