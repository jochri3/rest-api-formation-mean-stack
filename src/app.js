const express = require('express')
const cors = require('cors')
const { connectWithRetry } = require('./services/mongodb.js')
const { contactRoutes } = require('./router.js')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})

connectWithRetry()

app.set('socketio', io)
app.use(cors())
app.use(express.json())
app.use('/api/contacts', contactRoutes)

app.all('*', (_, res) => {
  res.sendStatus(404)
})

io.on('connection', (socket) => {
  socket.on('filling-form', () => {
    socket.broadcast.emit('another-filling-form')
  })

  socket.on('stop-filling-form', () => {
    socket.broadcast.emit('another-stop-filling-form')
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`REST API Server listening on port ${PORT}`)
})

module.exports = server
