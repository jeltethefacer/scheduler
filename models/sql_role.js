const sequelize = require("./dbConnection");
const {DataTypes, Model} = require("sequelize");

class Role extends Model{}

Role.init({
    abreviation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT
    }

}, {
    sequelize,
    modelName: "Role",
    timestamps: false
})

module.exports = Role