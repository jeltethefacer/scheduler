const User = require("./sql_user");
const Role = require("./sql_role");
const Timeslot = require("./sql_timeslot");
const TimeslotCategory = require("./sql_timeslotCategory");
const timeslot = require("./timeslot");
const sequelize = require("./dbConnection");
const { create } = require("./sql_user");




async function createModels() {
    sequelize.sync({force: true})
}

function getModels() {
    //role many-to-many
    User.belongsToMany(Role, {through: "UserRoles"});
    Role.belongsToMany(User, {through: "UserRoles"});

    //create subscribed
    Timeslot.belongsToMany(User, {through: "subscribedToTimeslot", as: "subscriber"});
    User.belongsToMany(Timeslot, {through: "subscribedToTimeslot", as: "subscriber"});

    Role.belongsToMany(Timeslot, {through: "TimeslotRoles"});
    Timeslot.belongsToMany(Role, {through: "TimeslotRoles"});

    //chairman one-to-many assoc 
    User.hasMany(Role, {
        foreignKey:{
            name: "chairman"
        },
        as: "chairman"
    })
    Role.belongsTo(Role, {foreignKey: "chairman"})

    //createdby timeslot one-to-many
    User.hasMany(Timeslot, {
        foreignKey: {
            name: "createdBy"
        },
        as: "createdByUser"
    })
    Timeslot.belongsTo(User, {
        foreignKey: {
            name: "createdBy"
        }, 
        as: "createdByUser"
    });

    //timeslotcategorie one-to-many relation.
    TimeslotCategory.hasMany(Timeslot, {
        foreignKey: {
            name: "timeslotCategory"
        }
    })
    Timeslot.belongsTo(TimeslotCategory, {foreignKey: "timeslotCategory"})

    return {
        User: User,
        Role: Role,
        Timeslot: Timeslot,
        TimeslotCategory: TimeslotCategory
    }
}

module.exports = getModels();
