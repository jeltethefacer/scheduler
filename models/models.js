const User = require("./sql_user");
const Role = require("./sql_role");
const Timeslot = require("./sql_timeslot");
const TimeslotCategory = require("./sql_timeslotCategory");
const timeslot = require("./timeslot");
const sequelize = require("./dbConnection");




async function createModels() {
    sequelize.sync({force: true})
}

function getModels() {
    //role many-to-many
    User.belongsToMany(Role, {through: "UserRoles"});
    Role.belongsToMany(User, {through: "UserRoles"});

    //chairman one-to-many assoc 
    User.hasMany(Role, {
        foreignKey:{
            name: "chairman"
        }
    })

    Role.belongsTo(User);

    //created timeslot on-to-many
    User.hasMany(Timeslot, {
        foreignKey: "createdBy"
    })
    Timeslot.belongsTo(User);

    //create subscribed
    Timeslot.belongsToMany(Role, {through: "subscribedToTmeslot"});
    Role.belongsToMany(Timeslot, {through: "subscribedToTmeslot"});

    //timeslotcategorie one-to-many relation.
    TimeslotCategory.hasMany(Timeslot, {
        foreignKey: "timeslotCategory"
    })
    Timeslot.belongsTo(TimeslotCategory);

    return {
        User: User,
        Role: Role,
        Timeslot: timeslot,
        TimeslotCategory: TimeslotCategory
    }
}

module.exports = getModels();
