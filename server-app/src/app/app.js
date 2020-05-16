const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const config = require('./../assets/config')

const RestOutDto = require('./models/rest/rest-out-dto')
const ErrorModel = require('./models/rest/error-model')

const app = express()

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB Atlas Connected')
  })

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  express.static(
    path.join(__dirname, '..', '..', '..', 'client-app', 'dist', 'client-app')
  )
)

const router = require('./routes/v1/index.js')
app.use('/api/v1/', router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // send error message
  error = new ErrorModel('CMN001', err.message, '')
  restOutDto = new RestOutDto('', error)
  res.status(err.status || 500).json(restOutDto)
})

module.exports = app
