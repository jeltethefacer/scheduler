const User = require("./models/user")
const Role = require("./models/role")
const mongoose = require("mongoose")

fs = require('fs');
const bcrypt = require('bcrypt')

const args = process.argv.slice(2, 6)

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

async function init(mongoURI, email, password, port=3001) {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

        const userModeratorRole = new Role({
            abreviation: "userModerator",
            description: "can change user"
        })

        const changeRoleRole = new Role({
            abreviation: "addRole",
            description: "can add roles"
        })

        const createTimeslotRole = new Role({
            abreviation: "createTimeslot",
            description: "can create timeslot"
        })

        const comBarRole = new Role({
            abreviation: "ComBar",
            description: "Henk is love, henk is life <3"
        })

        let roleArray = []
        roleArray = roleArray.concat(await userModeratorRole.save())
        roleArray = roleArray.concat(await changeRoleRole.save())
        roleArray = roleArray.concat(await createTimeslotRole.save())
        roleArray = roleArray.concat(await comBarRole.save())

        idArray = roleArray.map(role => {
            return role.id.toString()
        })

        const saltRounds = 10
        console.log(idArray)
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            frontName: "super",
            lastName: "admin",
            email: email,
            passwordHash: passwordHash,
            roles: idArray
        })
        const savedUser = await user.save()
        console.log(savedUser)

        const temp = await asyncForEach(idArray ,async (id) => {
            const role = await Role.findById(id)
            role.users = role.users.concat(savedUser._id.toString())
            await role.save()
            console.log(id, role)
        })
        const toWrite = `MONGODB_URI=${mongoURI}
PORT=${port}
SECRET="adsfkajsdlkfjajsd;lfj;" 
EMAIL_PASSWORD=imsodpzpwhjjomgx
USER_MODERATOR=${idArray[0]}
CHANGE_ROLE=${idArray[1]}
CREATE_TIMESLOT=${idArray[2]}
COM_BAR=${idArray[3]}`

        console.log(toWrite)

        fs.writeFileSync(".env" ,toWrite.toString(), (error) => {
            console.log("error in write", error)
        })
    } catch (err) {
        throw(err)
    }
}
if (args[0] && args[1] && args[2]) {
    init(
        args[0],
        args[1],
        args[2],
        args[3]
    ).then((response) => {
        process.exit()
    }).catch((error) => {
        console.log(error)
    })
}