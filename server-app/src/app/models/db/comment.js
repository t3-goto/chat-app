const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  regDatetime: {
    type: Number,
    required: true,
  },
  modDatetime: {
    type: Number,
    required: true,
  },
  user: {
    fullName: { type: String, required: true },
    initial: { type: String, required: true },
    userId: { type: String, required: true },
  },
})

module.exports = mongoose.model('Comment', CommentSchema)
