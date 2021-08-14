const express = require('express')
const cors = require('cors')
const { connectWithRetry } = require('./services/mongodb.js')
const { contactRoutes } = require('./router.js')

connectWithRetry()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/contacts', contactRoutes)

app.all('*', (_, res) => {
  res.sendStatus(404)
})

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log(`REST API Server listening on port ${PORT}`)
})

module.exports = server
