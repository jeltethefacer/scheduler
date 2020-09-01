const sequelize = require("./dbConnection");
const {DataTypes, Model, NOW} = require("sequelize");

class TimeslotCategory extends Model{}

TimeslotCategory.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cancelLength: {
        type: DataTypes.INTEGER
    },
    subscribeLength:{
        type: DataTypes.INTEGER,
        defaultValue: 3,
    }
}, {
    sequelize,
    modelName: "TimeslotCategory",
    timestamps: false
})


module.exports = TimeslotCategory