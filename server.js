import express from "express";

const app = express();

const contacts = [
  {
    id: 1,
    name: "Christophe Guéroult",
    phone: "+33 6 12 34 56 78",
    email: "c.gueroult@coderbase.io",
  },
  {
    id: 2,
    name: "Pierre-Nedelec",
    phone: "+33 6 12 34 32 78",
    email: "p.nedelec@coderbase.io",
  },
  {
    id: 3,
    name: "Christian Lisangola",
    phone: "+33 9 87 34 32 78",
    email: "christian@zabibu.co",
  },
];

app.get("/", (req, res) => {
  res.send(contacts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
