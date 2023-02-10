const User = require("./User");

module.exports = (sequelize, DataTypes) => {
    const NewAndPromotion = sequelize.define("NewAndPromotion", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        tableName: "new_and_promotion",
        timestamps: false
    } 
    );

    NewAndPromotion.associate = listaModelos => {
        NewAndPromotion.belongsTo(listaModelos.User, {
            as: "new_and_promotion_user",
            foreignKey: "user_id"
        });
    }
    
    return NewAndPromotion;
}