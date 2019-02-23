const mongoose = require('mongoose')
const Classifiers = require('../models/classifiersSchema')

exports.addClassifiers = function (req, res, next) {
  console.log('router.post is running')
  const classifier = createClassifier(req.body)
  classifier.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Handling POST requests to /classifiers',
      createdRow: result,
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.deleteClassifiersById = function (req, res, next) {
  const id = req.params.classifierId
  console.log('server: id: ', id)
  Classifiers.remove({_id: id}).exec().then(result => {
    res.status(200).json(result)
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.getClassifiers = function (req, res, next) {
  Classifiers.find().exec().then(docs => {
    console.log('Router.get running')
    console.log(docs)
    res.status(200).json(docs)
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.getClassifiersDistinct = function (req, res, next) {
  Classifiers.distinct('classifier').exec().then(docs => {
    console.log('Router.get running')
    console.log(docs)
    res.status(200).json(docs)
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.getClassifierGroups = function (req, res, next) {
  Classifiers.find({classifier: req.params.classifier}).exec().then( docs =>{
    console.log('Router.get classifiers groups running')
    console.log(docs)
    res.status(200).json(docs)
  }).catch( err=>{
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

function createClassifier (body) {
  return new Classifiers({
    _id: new mongoose.Types.ObjectId(),
    classifier: body.classifier,
    group: body.group,
    numberOfStudents: body.numberOfStudents,
  })
}
