const mongoose = require('mongoose')

const educationalPlanSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  classifier: String,
  digit: String,
  courses: String,
  coursesId: mongoose.Schema.Types.ObjectId,
  semester1: String,
  semester2: String,
  semester3: String,
  semester4: String,
  semester5: String,
  semester6: String,
  semester7: String,
  semester8: String
})

module.exports = mongoose.model('EducationalPlan', educationalPlanSchema)
