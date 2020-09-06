const jwt = require('jsonwebtoken')
const {User, Role} = require('../models/models')
const logger = require("../utils/logger")

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {

    return authorization.substring(7)
  }
  return null
}

const roleAuthorization = async (req, roleId) => {
  const token = getTokenFrom(req)
  var decodedToken = null

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch {
    return { passed: false, message: "invalid or missing token" }
  }

  if (!token || !decodedToken.id) {
    return { passed: false, message: "invalid or missing token" }
  }

  const authorizedUser = await User.findByPk(decodedToken.id)
  const role = await Role.findByPk(roleId)
  if(!role) {
    return { passed: false, message: "Role not ofund", user: authorizedUser }
  }

  if (!authorizedUser.hasRole(role)) {
    return { passed: false, message: "Not the nesessary authorization", user: authorizedUser }
  }
  return { passed: true, user: authorizedUser }
}

const authorization = async (req) => {
  const token = getTokenFrom(req)
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch {
    return { passed: false, message: "invalid or missing token" }
  }

  if (!token || !decodedToken.id) {
    return { passed: false, message: "invalid or missing token" }
  }

  const authorizedUser = await User.findByPk(decodedToken.id)
  if (authorizedUser) {
    return { passed: true, user: authorizedUser }
  }
  return { passed: false, message: "Token was valud but no use found." }
}

module.exports = {
  roleAuthorization,
  authorization
}