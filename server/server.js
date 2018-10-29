const http = require('http')
const app = require('./app')
const port = process.env.PORT || 5000

const server = http.createServer(app)

console.log('server running')
console.log('port listening: ', port)
server.listen(port)
