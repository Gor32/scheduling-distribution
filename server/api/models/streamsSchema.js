const mongoose = require('mongoose')

const streamsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  classifier: String,
  group: String,
  subjectId: mongoose.Schema.Types.ObjectId,
  stream: String,
  numberOfStudents: Number,
  semester: String
})

module.exports = mongoose.model('Streams', streamsSchema)
