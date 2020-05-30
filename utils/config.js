require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const USER_MODERATOR = process.env.USER_MODERATOR
const CHANGE_ROLE = process.env.CHANGE_ROLE
const CREATE_TIMESLOT = process.env.CREATE_TIMESLOT
const COM_BAR = process.env.COM_BAR


module.exports = {
    MONGODB_URI,
    PORT,
    SECRET,
    EMAIL_PASSWORD,
    USER_MODERATOR, 
    CHANGE_ROLE,
    CREATE_TIMESLOT,
    COM_BAR
}