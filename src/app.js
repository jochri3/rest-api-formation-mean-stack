import express from 'express'
import cors from 'cors'
import { connectWithRetry } from './services/mongodb.js'
import { contactRoutes } from './router.js'

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

export default server
