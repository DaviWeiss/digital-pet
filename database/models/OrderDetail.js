const User = require("./User");

module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define("OrderDetail", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        order_date: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        address:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        complement:{
            type: DataTypes.STRING(15),
            defaultValue: "",
            allowNull: true
        },
        cep:{
            type: DataTypes.CHAR(9),
            allowNull: false
        },
        payment_type:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        order_value:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        status:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        tableName: "order_detail",
        timestamps: false
    } 
    );

    OrderDetail.associate = listaModelos => {
        OrderDetail.belongsToMany(listaModelos.Product, {
            as: "order_products",
            through: "order_product",
            foreignKey: "order_id",
            otherKey: "product_id",
            timestamps: false
        });

        OrderDetail.belongsTo(listaModelos.User, {
            as: "order",
            foreignKey: "user_id"
        });
    }
    
    return OrderDetail;
}