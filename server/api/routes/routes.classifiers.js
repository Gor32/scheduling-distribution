const express = require('express')
const router = express.Router()
const lib = require('../lib/lib.classifiers')

router.get('/', lib.getClassifiers)

router.get('/distinctClassifiers', lib.getClassifiersDistinct)

router.get('/:classifier', lib.getClassifierGroups)

router.post('/', lib.addClassifiers)

router.delete('/:classifierId', lib.deleteClassifiersById)

module.exports = router
