const express = require('express')
const router = express.Router()
const User = require('../../models/db/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const config = require('./../../../assets/config')

const RestOutDto = require('./../../models/rest/rest-out-dto')
const ErrorModel = require('./../../models/rest/error-model')

// POST
router.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const provider = req.body.provider

  // validation
  if (!email) {
    error = new ErrorModel('LOGV01', 'Fill email', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(422).json(restOutDto)
  }

  if (!password) {
    error = new ErrorModel('LOGV01', 'Fill password', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(422).json(restOutDto)
  }

  if (!provider) {
    error = new ErrorModel('LOGV03', 'Fill provider', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(422).json(restOutDto)
  }

  User.findOne({ email }, (err, user) => {
    console.log(JSON.stringify(user))
    if (err) {
      error = new ErrorModel('LOG001', 'Some DB error occurs', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(500).json(restOutDto)
    }
    if (!user) {
      error = new ErrorModel('LOG002', 'Target user is not found', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(404).json(restOutDto)
    }
    if (!bcrypt.compareSync(password, user.password)) {
      error = new ErrorModel('LOG003', 'Incorrect password', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(422).json(restOutDto)
    }

    const today = moment().format('YYYYMMD')
    if (user.loginDate != today) {
      user.loginDate = today
      user.password = encryptData(password)

      user.save((err) => {
        if (err) {
          error = new ErrorModel('LOG004', 'Some DB error occurs', null)
          restOutDto = new RestOutDto(null, error)
          return res.status(500).json(restOutDto)
        }
        const data = {
          token: jwt.sign(
            {
              userId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
            },
            config.SECRET,
            {
              expiresIn: '3h',
            }
          ),
        }
        error = new ErrorModel(null, null, null)
        restOutDto = new RestOutDto(data, error)
        return res.status(200).json(restOutDto)
      })
    } else {
      const data = {
        token: jwt.sign(
          {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          config.SECRET,
          {
            expiresIn: '3h',
          }
        ),
      }
      error = new ErrorModel(null, null, null)
      restOutDto = new RestOutDto(data, error)
      return res.status(200).json(restOutDto)
    }
  })
})

// GET
router.get('/', (req, res) => {
  error = new ErrorModel('GETL01', 'This method was not supported', null)
  restOutDto = new RestOutDto(null, error)
  return res.status(500).json(restOutDto)
})

// PUT
router.put('/', (req, res) => {
  error = new ErrorModel('PUTL01', 'This method was not supported', null)
  restOutDto = new RestOutDto(null, error)
  return res.status(500).json(restOutDto)
})

// DEL
router.delete('/', (req, res) => {
  error = new ErrorModel('DEL01', 'This method was not supported', null)
  restOutDto = new RestOutDto(null, error)
  return res.status(500).json(restOutDto)
})

function encryptData(data) {
  console.log('data: ' + data)
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  console.log('salt: ' + salt)
  const hash = bcrypt.hashSync(data, salt)
  console.log('hash: ' + hash)
  return hash
}

module.exports = router
