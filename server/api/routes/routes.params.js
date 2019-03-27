const express = require('express')
const router = express.Router()
const lib = require('../lib/lib.params')

router.get('/', lib.getParams)

router.post('/', lib.setParams)

router.get('/init', lib.initParams)

module.exports = router
