const mongoose = require('mongoose')

const subjectsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  digit: String,
  subject: String
})

module.exports = mongoose.model('Subjects', subjectsSchema)
