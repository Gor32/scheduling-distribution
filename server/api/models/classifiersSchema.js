const mongoose = require('mongoose')

const classifiersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  classifier: String,
  group: String
})

module.exports = mongoose.model('Classifiers', classifiersSchema)
