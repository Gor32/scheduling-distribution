const express = require('express')
const router = express.Router()
const lib = require('../lib/lib.educationalPlan')

router.get('/', lib.getEducationalPlan)

router.get('/:educationalPlanClassifier', lib.getEducationalPlanByClassifier)

router.post('/', lib.addEducationalPlan)

router.delete('/:educationalPlanId', lib.deleteEducationalPlanById)

module.exports = router
