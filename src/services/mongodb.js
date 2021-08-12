import mongoose from 'mongoose'
import { config } from 'dotenv-flow'
let count = 0

//TODO:Update this to use the config.json file
const options = {
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  // all other approaches are now deprecated by MongoDB:
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
config()

export const connectWithRetry = () =>
  mongoose
    .connect(process.env.DATABASE_URL, options)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err) => {
      console.log('Failed to connect to MongoDB', err)
      console.log('Retry after after 5 seconds', ++count)
      setTimeout(connectWithRetry, 5000)
    })

export default mongoose
