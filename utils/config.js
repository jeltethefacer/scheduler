require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
module.exports = {
    MONGODB_URI,
    PORT,
    SECRET,
    EMAIL_PASSWORD
}