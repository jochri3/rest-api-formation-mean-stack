import mongoose from "mongoose";
import { config } from "dotenv";
let count = 0;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
config();
// import { getConnection } from "lib/connections/mongoose";

export const connectWithRetry = () =>
  mongoose
    .connect(process.env.DATABASE_URL, options)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
      console.log("Retry after after 5 seconds", ++count);
      setTimeout(connectWithRetry, 5000);
    });
   

export default mongoose;
