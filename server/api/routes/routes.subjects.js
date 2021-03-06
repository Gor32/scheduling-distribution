const express = require('express')
const router = express.Router()
const lib = require('../lib/lib.subjects')

router.get('/', lib.getSubjects)

router.post('/', lib.addSubjects)

router.delete('/:subjectId', lib.deleteSubjectsById)

module.exports = router
