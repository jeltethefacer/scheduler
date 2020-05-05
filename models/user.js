const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    frontName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()

        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model("User", userSchema)

module.exports = User