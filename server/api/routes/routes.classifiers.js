const express = require('express')
const router = express.Router()
const lib = require('../lib/lib.classifiers')

router.get('/', lib.getClassifiers)

router.post('/', lib.addClassifiers)

router.delete('/:classifierId', lib.deleteClassifiersById)

module.exports = router
