module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cpf: {
            type: DataTypes.CHAR(14),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        user_name:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        cell_phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true
        },
        user_password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        plan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'plan',
                key: 'id'
            }
        }
    },
    {
        tableName: "user",
        timestamps: false
    } 
    );

    User.associate = listaModelos => {
        User.hasMany(listaModelos.OrderDetail, {
            as: "user_orders",
            foreignKey: "user_id",
        });

        User.hasMany(listaModelos.NewAndPromotion, {
            as: "user_news",
            foreignKey: "user_id",
        })

        User.belongsTo(listaModelos.Plan, {
            as: "user_plan",
            foreignKey: "plan_id"
        });
    }
    
    return User;
}