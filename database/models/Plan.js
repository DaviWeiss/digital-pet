module.exports = (sequelize, DataTypes) => {
    const Plan = sequelize.define("Plan", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        recurrence: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        value: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        benefits: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: "plan",
        timestamps: false
    } 
    );
    
    return Plan;
}