const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
  loginDate: {
    type: String,
  },
  regDate: {
    type: String,
    required: true,
  },
  modDate: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', UserSchema)
