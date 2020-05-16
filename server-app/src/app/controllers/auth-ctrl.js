const jwt = require('jsonwebtoken')
const config = require('./../../assets/config')
const User = require('./../models/db/user')
const RestOutDto = require('./../models/rest/rest-out-dto')
const ErrorModel = require('./../models/rest/error-model')

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    error = new ErrorModel('AUT001', 'You are not authoriazed', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(401).json(restOutDto)
  }

  jwt.verify(token.split(' ')[1], config.SECRET, (err, decodedToken) => {
    console.log(JSON.stringify(decodedToken))
    if (err) {
      error = new ErrorModel('AUT002', 'You are not authoriazed', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(401).json(restOutDto)
    }

    User.findById(decodedToken.userId, (err, user) => {
      if (err) {
        error = new ErrorModel('AUT003', 'You are not authoriazed', null)
        restOutDto = new RestOutDto(null, error)
        return res.status(401).json(restOutDto)
      }
      if (!user) {
        error = new ErrorModel('AUT004', 'You are not authoriazed', null)
        restOutDto = new RestOutDto(null, error)
        return res.status(401).json(restOutDto)
      }
      req.body.user = user
      next()
    })
  })
}
