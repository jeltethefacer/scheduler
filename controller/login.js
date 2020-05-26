const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

const config = require("../utils/config")

const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(body)
  const user = await User.findOne({ email: body.email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  console.log(passwordCorrect)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      errorCode: 'INVALID_EMAIL_OR_PASS'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }
  console.log(userForToken)
  const token = jwt.sign(userForToken, config.SECRET)
  console.log(token)
  response
    .status(200)
    .send({ token, email: user.email, frontName: user.frontName })
})

module.exports = loginRouter