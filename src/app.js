const express = require('express')
const cors = require('cors')
const { connectWithRetry } = require('./services/mongodb.js')
const { contactRoutes } = require('./router.js')

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: ['*'],
  },
})

connectWithRetry()

const app = express()

app.set('socketio', io)
app.use(cors())
app.use(express.json())
app.use('/api/contacts', contactRoutes)

app.all('*', (_, res) => {
  res.sendStatus(404)
})

io.on('connection', (socket) => {
  socket.on('filling-form', () => {
    socket.emit.broadcast('other-user-filling-form')
  })
})

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log(`REST API Server listening on port ${PORT}`)
})

module.exports = server
