import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenu dans le serveur express");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
