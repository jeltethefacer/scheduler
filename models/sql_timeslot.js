const sequelize = require("./dbConnection");
const {DataTypes, Model, NOW} = require("sequelize");

class Timeslot extends Model{}

Timeslot.init({
    maxPeople: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    description: {
        type: DataTypes.TEXT
    },
    startTime:{
        type: DataTypes.DATE,
        defaultValue: NOW,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW
    }
}, {
    sequelize,
    modelName: "Timeslot",
    timestamps: false
})

module.exports = Timeslot