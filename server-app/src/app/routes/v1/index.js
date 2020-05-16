const express = require('express')
const router = express.Router()

router.use('/users', require('./users.js'))
router.use('/login', require('./login.js'))
router.use('/comment', require('./comment.js'))

module.exports = router
