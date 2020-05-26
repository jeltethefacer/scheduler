const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    abreviation: { 
        type: String,
        unique: true,
        required: true
    },
    description: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

roleSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Role = mongoose.model("Role", roleSchema)

module.exports = Role