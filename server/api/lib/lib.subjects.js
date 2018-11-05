const mongoose = require('mongoose')
const Subjects = require('../models/subjectsSchema')

exports.addSubjects = function (req, res, next) {
  console.log('router.post is running')
  const subject = createSubject(req.body)
  subject.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Handling POST requests to /subjects',
      createdRow: result,
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.getSubjects = function (req, res, next) {
  Subjects.find().exec().then(docs=>{
    console.log("Router.get running")
    console.log(docs)
    res.status(200).json(docs)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

function createSubject (body) {
  return new Subjects({
    _id: new mongoose.Types.ObjectId(),
    digit: body.digit,
    subject: body.subject
  })
}
