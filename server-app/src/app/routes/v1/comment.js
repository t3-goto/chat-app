const express = require('express')
const router = express.Router()
const Comment = require('../../models/db/comment')
const moment = require('moment')
const RestOutDto = require('./../../models/rest/rest-out-dto')
const ErrorModel = require('./../../models/rest/error-model')
const AuthCtrl = require('./../../controllers/auth-ctrl')

// POST
router.post('/', AuthCtrl.authMiddleware, (req, res) => {
  let comment = new Comment()
  comment.content = req.body.content
  const now = new Date().getTime()
  comment.regDatetime = now
  comment.modDatetime = now
  comment.user.userId = req.body.user._id
  comment.user.fullName = req.body.user.firstName + ' ' + req.body.user.lastName
  comment.user.initial = req.body.user.firstName[0].toUpperCase()

  // validation
  if (!comment.content) {
    error = new ErrorModel('POSC01', 'Fill content', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(422).json(restOutDto)
  }

  comment.save((err) => {
    if (err) {
      error = new ErrorModel('POSC02', 'Some DB error occurs', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(500).json(restOutDto)
    }
    error = new ErrorModel(null, null, null)
    restOutDto = new RestOutDto(comment, error)
    return res
      .location('/' + comment._id)
      .status(201)
      .json(restOutDto)
  })
})

// GET
router.get('/', AuthCtrl.authMiddleware, (req, res) => {
  Comment.find().then((comments) => {
    error = new ErrorModel(null, null, null)
    restOutDto = new RestOutDto(comments, error)
    return res.status(200).json(restOutDto)
  })
})

// GET /id
router.get('/:id', AuthCtrl.authMiddleware, (req, res) => {
  const commentId = req.params.id

  Comment.findById(commentId, (err, comment) => {
    if (err) {
      error = new ErrorModel('GETC01', 'Target comment is not found', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(404).json(restOutDto)
    } else {
      error = new ErrorModel(null, null, null)
      restOutDto = new RestOutDto(comment, error)
      return res.status(200).json(restOutDto)
    }
  })
})

// PUT /id
router.put('/:id', AuthCtrl.authMiddleware, (req, res) => {
  const commentId = req.params.id

  // validation
  if (!req.body.content) {
    error = new ErrorModel('PUTC01', 'Fill content', null)
    restOutDto = new RestOutDto(null, error)
    return res.status(404).json(restOutDto)
  }
  let isModContent = false

  Comment.findById(commentId, (err, comment) => {
    if (err) {
      error = new ErrorModel('PUTC02', 'Target comment is not found', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(404).json(restOutDto)
    } else {
      if (comment.content != req.body.content) {
        comment.content = req.body.content
        isModContent = true
      }
      if (!isModContent) {
        error = new ErrorModel(null, null, null)
        restOutDto = new RestOutDto(null, error)
        return res.status(304).json(restOutDto)
      } else {
        const now = new Date().getTime()
        comment.modDatetime = now
        console.log(comment)
        comment.save((err) => {
          if (err) {
            error = new ErrorModel('PUTC03', 'Some DB error occurs', null)
            restOutDto = new RestOutDto(null, error)
            return res.status(500).json(restOutDto)
          } else {
            error = new ErrorModel(null, null, null)
            restOutDto = new RestOutDto(comment, error)
            return res.status(200).json(restOutDto)
          }
        })
      }
    }
  })
})

// DEL /id
router.delete('/:id', AuthCtrl.authMiddleware, (req, res) => {
  const commentId = req.params.id

  Comment.findById(commentId, (err, comment) => {
    if (err) {
      error = new ErrorModel('DELC01', 'Target comment is not found', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(404).json(restOutDto)
    }
    if (!comment) {
      error = new ErrorModel('DEL002', 'Target comment is not found', null)
      restOutDto = new RestOutDto(null, error)
      return res.status(404).json(restOutDto)
    } else {
      comment.remove({ _id: commentId }).then(() => {
        error = new ErrorModel(null, null, null)
        restOutDto = new RestOutDto(null, error)
        return res.status(204).json(restOutDto)
      })
    }
  })
})

module.exports = router
