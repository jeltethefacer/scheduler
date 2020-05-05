const jwt = require('jsonwebtoken')
const User = require('../models/user')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

const roleAuthorization = async (req, roleId) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return {passed: false, message: "invalid or missing token"}
    }

    const authorizedUser = await User.findById(decodedToken.id)
    
    if(!authorizedUser.roles.includes(roleId)) {
        return {passed: false, message:"Not the nesessary authorization"}
    }
    return {passed: true}
}

module.exports = roleAuthorization