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

exports.initParams = function (req, res, next) {
  console.log('router.post is running')
  Params.deleteMany({},).exec()
  const values = Object.keys(utils.PARAMS).map(function (key) {
    return utils.PARAMS[key]
  })
  values.forEach(r => {
    const param = createParam(r)
    param.save().then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
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

exports.setParams = function (req, res, next) {
  console.log('router.post is running')
  Params.deleteMany({},).exec()
  const paramsBody = JSON.parse(JSON.stringify({...req.body}))
  //console.log(paramsBody)
  const values = Object.keys(utils.PARAMS).map(function (key) {
    //console.log('lol-', paramsBody[utils.PARAMS[key].code])
    return {
      code: utils.PARAMS[key].code,
      value: paramsBody[utils.PARAMS[key].code]
    }
  })
  values.forEach(r => {
    const param = createParam(r)
    param.save().then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  })
  res.status(200).json({message: 'ok'})
}
