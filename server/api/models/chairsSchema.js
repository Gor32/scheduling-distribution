const mongoose = require('mongoose')

const chairsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: String,
  chair: String
})

module.exports = mongoose.model('Chairs', chairsSchema)
