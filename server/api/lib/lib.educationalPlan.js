const mongoose = require('mongoose')
const EducationalPlan = require('../models/educationalPlanSchema')

exports.addEducationalPlan = function (req, res, next) {
  console.log('router.post is running')
  const educationalPlan = createEducationalPLan(req.body)
  educationalPlan.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Handling POST requests to /educationalPlan',
      createdRow: result,
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.deleteEducationalPlanById = function (req, res, next) {
  const id = req.params.educationalPlanId
  EducationalPlan.remove({_id: id}).exec().then(result => {
    res.status(200).json(result)
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.getEducationalPlan = function (req, res, next) {
  EducationalPlan.find().exec().then(docs => {
    console.log('Router.get running')
    console.log(docs)
    //   if (docs.length >= 0) {
    res.status(200).json(docs)
    //   } else {
    //       res.status(404).json({
    //           message: 'No entries found'
    //       });
    //   }
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.getEducationalPlanById = function (req, res, next) {
  const id = req.params.educationalPlanId
  EducationalPlan.findById(id).exec().then(doc => {
    console.log('From database', doc)
    if (doc) {
      res.status(200).json(doc)
    } else {
      res.status(404).json({message: 'No valid entry found for provided ID'})
    }
  }).catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  })
}

function createEducationalPLan (body) {
  return new EducationalPlan({
    _id: new mongoose.Types.ObjectId(),
    digit: body.digit,
    courses: body.courses,
    semester1: body.semester1,
    semester2: body.semester2,
    semester3: body.semester3,
    semester4: body.semester4,
    semester5: body.semester5,
    semester6: body.semester6,
    semester7: body.semester7,
    semester8: body.semester8
  })
}
