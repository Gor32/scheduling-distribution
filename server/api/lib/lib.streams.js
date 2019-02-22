const mongoose = require('mongoose')
const Streams = require('../models/streamsSchema')

exports.addStreams = function (req, res, next) {
  console.log('router.post is running')
  const stream = createStream(req.body)
  stream.save().then(result => {
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

exports.getStreams = function (req, res, next) {
  const classifier = req.params.classifier
  Streams.find().where('classifier').equals(classifier).exec().then(docs => {
    console.log('Router.get streams running')
    if (docs) {
      res.status(200).json(docs)
      console.log(docs)
    } else {
      res.status(404).json({message: 'No valid entry found for provided ID'})
    }
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

exports.deleteStreamsById = function (req, res, next) {
  const id = req.params.streamId
  console.log('server: id: ', id)
  Streams.remove({_id: id}).exec().then(result => {
    res.status(200).json(result)
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
}

function createStream (body) {
  return new Streams({
    _id: new mongoose.Types.ObjectId(),
    classifier: body.classifier,
    group: body.group,
    subjectId: body.subjectId,
    stream: body.stream,
    numberOfStudents: body.numberOfStudents,
    semester: body.semester
  })
}
