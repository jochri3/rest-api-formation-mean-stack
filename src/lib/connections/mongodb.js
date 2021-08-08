import mongoose from "mongoose";
import { config } from "dotenv";

config();
// import { getConnection } from "lib/connections/mongoose";

export const getConnection = () =>
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
