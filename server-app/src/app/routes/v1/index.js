const express = require('express')
const router = express.Router()

router.use('/users', require('./users.js'))
router.use('/login', require('./login.js'))
router.use('/comments', require('./comment.js'))

module.exports = router
