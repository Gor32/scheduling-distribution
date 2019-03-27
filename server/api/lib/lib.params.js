const mongoose = require('mongoose')
const Params = require('../models/paramsSchema')
const utils = require('../../utils/index')

exports.getParams = function (req, res, next) {
  console.log('get params working')
  Params.find().exec().then(docs => {
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

//BAD CODE
exports.initParams = function (req, res, next) {
  console.log('router.post is running')
  const param1 = createParam(utils.PARAMS.EXAMINATION)
  param1.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })
  const param2 = createParam(utils.PARAMS.TESTING)
  param2.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

  const param3 = createParam(utils.PARAMS.CONSULTATION_EXAMINATION)
  param3.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

  const param4 = createParam(utils.PARAMS.CONSULTATION_TESTING)
  param4.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

  const param5 = createParam(utils.PARAMS.COURSE_WORK)
  param5.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

  const param6 = createParam(utils.PARAMS.COURSE_PROJECT)
  param6.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

  const param7 = createParam(utils.PARAMS.PRACTICE)
  param7.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

  const param8 = createParam(utils.PARAMS.LAB)
  param8.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

  const param9 = createParam(utils.PARAMS.PRACTICAL)
  param9.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

  const param10 = createParam(utils.PARAMS.DIPLOMA)
  param10.save().then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })

  res.status(200).json({message: 'ok'})
}

function createParam (body) {
  return new Params({
    _id: new mongoose.Types.ObjectId(),
    code: body.code,
    value: body.value,
  })
}
