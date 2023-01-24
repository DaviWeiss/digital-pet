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
            allowNull: false
        }
    },
    {
        tableName: "user",
        timestamps: false
    } 
    );
    
    return User;
}