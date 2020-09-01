const {User, Role} = require("./models/models")

fs = require('fs');
const bcrypt = require('bcrypt')

const args = process.argv.slice(2, 6)

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

async function init(email, password, port=3001) {
    try {

        const userModeratorRole = await Role.create({
            abreviation: "userModerator",
            description: "can change user"
        })

        const changeRoleRole = await Role.create({
            abreviation: "addRole",
            description: "can add roles"
        })

        const createTimeslotRole = await Role.create({
            abreviation: "createTimeslot",
            description: "can create timeslot"
        })

        const comBarRole = await Role.create({
            abreviation: "ComBar",
            description: "Henk is love, henk is life <3"
        })



        let roleArray = []
        roleArray = roleArray.concat(await userModeratorRole.save())
        roleArray = roleArray.concat(await changeRoleRole.save())
        roleArray = roleArray.concat(await createTimeslotRole.save())
        roleArray = roleArray.concat(await comBarRole.save())

        console.log(roleArray);

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = await User.create({
            frontName: "super",
            lastName: "admin",
            email: email,
            passwordHash: passwordHash
        })

    
        const savedUser = await user.save()
        console.log(await savedUser.addRoles(roleArray));
        await userModeratorRole.save()

        const toWrite = `PORT=${port}
SECRET="adsfkajsdlkfjajsd;lfj;" 
EMAIL_PASSWORD=imsodpzpwhjjomgx
USER_MODERATOR=${roleArray[0].id}
CHANGE_ROLE=${roleArray[1].id}
CREATE_TIMESLOT=${roleArray[2].id}
COM_BAR=${roleArray[3].id}`

        console.log(toWrite)

        fs.writeFileSync(".env" ,toWrite.toString(), (error) => {
            console.log("error in write", error)
        })
    } catch (err) {
        throw(err)
    }
}
console.log(args);
if (args[0] && args[1]) {
    console.log("iaf")
    init(
        args[0],
        args[1],
        args[2]
    ).then((response) => {
        process.exit()
    }).catch((error) => {
        console.log(error)
    })
}