const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const authController = {}

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization
    if (!tokenString) {
      throw new Error('invalid token')
    }
    const token = tokenString.replace('Bearer ', '')
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error('invalid token')
      }
      req.userId = payload._id // req에 값 넣어서 next()로 보내기
    })
    next()
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

module.exports = authController
