const sequelize = require("./dbConnection");
const {DataTypes, Model} = require("sequelize");

class User extends Model{}

User.init({
    frontName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    passwordHash: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: "User",
    timestamps: false
})

module.exports = User