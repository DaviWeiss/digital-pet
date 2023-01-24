module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define("OrderDetail", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        address:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        complement:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cep:{
            type: DataTypes.CHAR(9),
            allowNull: false
        },
        payment_type:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        value:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "order_detail",
        timestamps: false
    } 
    );
    
    return OrderDetail;
}