const express = require('express')
const router = express.Router()
const lib = require('../lib/lib.streams')

router.get('/:classifier', lib.getStreams)

router.post('/', lib.addStreams)

router.delete('/:streamId', lib.deleteStreamsById)

module.exports = router
