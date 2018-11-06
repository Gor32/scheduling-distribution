const mongoose = require('mongoose')
const Chairs = require('../models/chairsSchema')

exports.addChairs = function (req, res, next) {
  console.log('router.post is running')
  const chair = createChair(req.body)
  chair.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Handling POST requests to /chairs',
      createdRow: result,
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.deleteChairsById = function (req, res, next) {
  const id = req.params.chairId
  console.log('server: id: ', id)
  Chairs.remove({_id: id}).exec().then(result => {
    res.status(200).json(result)
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.getChairs = function (req, res, next) {
  Chairs.find().exec().then(docs => {
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

function createChair (body) {
  return new Chairs({
    _id: new mongoose.Types.ObjectId(),
    code: body.code,
    chair: body.chair
  })
}
