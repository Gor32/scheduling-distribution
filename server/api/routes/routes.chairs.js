const express = require('express')
const router = express.Router()
const lib = require('../lib/lib.chairs')

router.get('/', lib.getChairs)

router.post('/', lib.addChairs)

router.delete('/:chairId', lib.deleteChairsById)

module.exports = router
