const mongoose = require('mongoose')

const subjectsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  chair: String,
  digit: String,
  subject: String
})

module.exports = mongoose.model('Subjects', subjectsSchema)
