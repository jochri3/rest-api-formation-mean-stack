import express from "express";
import cors from "cors";
import { connectWithRetry } from "./services/connections/mongodb.js";
import { contactRoutes } from "./router.js";

connectWithRetry();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`REST API Server listening on port ${PORT}`);
});
