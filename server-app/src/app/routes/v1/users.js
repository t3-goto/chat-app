const express = require('express')
const router = express.Router()
const User = require('../../models/db/user')
const moment = require('moment')
const bcrypt = require('bcrypt')
const RestOutDto = require('./../../models/rest/rest-out-dto')
const ErrorModel = require('./../../models/rest/error-model')

// POST
router.post('/', (req, res) => {
  let user = new User()
  const today = moment().format('YYYYMMD')
  user.email = req.body.email
  user.password = req.body.password
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName
  user.provider = req.body.provider
  user.loginDate = ''
  user.regDate = today
  user.modDate = today

  // validation
  if (!user.email) {
    error = new ErrorModel('POSV01', 'Fill email', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(422).json(restOutDto)
  }
  if (!user.password) {
    error = new ErrorModel('POSV02', 'Fill password', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(422).json(restOutDto)
  }
  if (!user.provider) {
    error = new ErrorModel('POSV03', 'Fill provider', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(422).json(restOutDto)
  }

  user.password = encryptData(user.password)
  console.log('user: ' + JSON.stringify(user))

  user.save((err) => {
    if (err) {
      error = new ErrorModel('POS001', 'Some DB error occurs', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(500).json(restOutDto)
    }
    error = new ErrorModel(null, null, null)
    restOutDto = new RestOutDto(user, error)
    return res
      .location('/' + user._id)
      .status(201)
      .json(restOutDto)
  })
})

// GET
router.get('/', (req, res) => {
  User.find().then((users) => {
    error = new ErrorModel(null, null, null)
    restOutDto = new RestOutDto(users, error)
    return res.status(200).json(restOutDto)
  })
})

// GET /id
router.get('/:id', (req, res) => {
  const userId = req.params.id

  User.findById(userId, (err, user) => {
    if (err) {
      error = new ErrorModel('GET001', 'Target user is not found', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(404).json(restOutDto)
    } else {
      error = new ErrorModel(null, null, null)
      restOutDto = new RestOutDto(user, error)
      return res.status(200).json(restOutDto)
    }
  })
})

// PUT /id
router.put('/:id', (req, res) => {
  const userId = req.params.id

  if (!req.body.email) {
    error = new ErrorModel('PUTV01', 'Fill email', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(404).json(restOutDto)
  }
  if (!req.body.password) {
    error = new ErrorModel('PUTV02', 'Fill password', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(404).json(restOutDto)
  }
  if (!req.body.provider) {
    error = new ErrorModel('PUTV03', 'Fill provider', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(404).json(restOutDto)
  }

  let isModEmail = false
  let isModPassword = false
  let isModFirstName = false
  let isModLastName = false
  let isModProvider = false

  User.findById(userId, (err, user) => {
    if (err) {
      error = new ErrorModel('PUT001', 'Target user is not found', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(404).json(restOutDto)
    } else {
      if (user.email != req.body.email) {
        user.email = req.body.email
        isModEmail = true
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        user.password = encryptData(req.body.password)
        console.log('user.password: ' + user.password)
        isModPassword = true
      }
      if (user.firstName != req.body.firstName) {
        user.firstName = req.body.firstName
        isModFirstName = true
      }
      if (user.lastName != req.body.lastName) {
        user.lastName = req.body.lastName
        isModLastName = true
      }
      if (user.provider != req.body.provider) {
        user.provider = req.body.provider
        isModProvider = true
      }
      if (
        !(
          isModEmail ||
          isModPassword ||
          isModFirstName ||
          isModLastName ||
          isModProvider
        )
      ) {
        error = new ErrorModel(null, null, null)
        restOutDto = new RestOutDto(null, error)
        return res.status(304).json(restOutDto)
      } else {
        const today = moment().format('YYYYMMD')
        user.modDate = today
        console.log(user)
        user.save((err) => {
          if (err) {
            error = new ErrorModel('PUT002', 'Some DB error occurs', null)
            restOutDto = new RestOutDto(null, error)
            return res.status(500).json(restOutDto)
          } else {
            error = new ErrorModel(null, null, null)
            restOutDto = new RestOutDto(null, error)
            return res.status(200).json(restOutDto)
          }
        })
      }
    }
  })
})

// DEL /id
router.delete('/:id', (req, res) => {
  const userId = req.params.id

  User.findById(userId, (err, user) => {
    if (err) {
      error = new ErrorModel('DEL001', 'Target user is not found', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(404).json(restOutDto)
    }
    if (!user) {
      error = new ErrorModel('DEL002', 'Target user is not found', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(404).json(restOutDto)
    } else {
      user.remove({ _id: userId }).then(() => {
        error = new ErrorModel(null, null, null)
        restOutDto = new RestOutDto(null, error)
        return res.status(204).json(restOutDto)
      })
    }
  })
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
