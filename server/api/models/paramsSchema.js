const mongoose = require('mongoose')

const paramsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: String,
  value: String
})

module.exports = mongoose.model('Params', paramsSchema)
