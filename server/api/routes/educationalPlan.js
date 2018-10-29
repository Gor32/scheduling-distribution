const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const EducationalPlan = require('../models/educationalPlanSchema')

router.get('/', (req, res, next) => {
  EducationalPlan.find().exec().then(docs => {
    console.log("Router.get running")
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
})

router.post('/', (req, res, next) => {
  console.log("router.post is running")
  const educationalPlan =
    new EducationalPlan({
      _id: new mongoose.Types.ObjectId(),
      digit: req.body.digit,
      courses: req.body.courses,
      semester1: req.body.semester1,
      semester2: req.body.semester2,
      semester3: req.body.semester3,
      semester4: req.body.semester4,
      semester5: req.body.semester5,
      semester6: req.body.semester6,
      semester7: req.body.semester7,
      semester8: req.body.semester8,
    })
  educationalPlan.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Handling POST requests to /products',
      createdProduct: result,
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
})

router.get('/:educationalPlanId', (req, res, next) => {
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
})

router.delete('/:educationalPlanId', (req, res, next) => {
  const id = req.params.educationalPlanId
  EducationalPlan.remove({_id: id}).exec().then(result => {
    res.status(200).json(result)
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
})

module.exports = router
