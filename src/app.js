import express from "express";
import cors from "cors";
import { getConnection } from "./lib/connections/mongodb.js";
import { contactRoutes } from "./router.js";

getConnection()
  .then(() => console.log("Connexion à la base de données établie"))
  .catch((error) => logger.info(error));

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
