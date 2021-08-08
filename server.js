import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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

app.get("/api/contacts", (req, res) => {
  res.send(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  const id = req.params.id;
  const contact = contacts.find((contact) => contact.id == id);
  if (contact) {
    return res.send(contact);
  }
  res.sendStatus(404);
});

app.post("/api/contacts", (req, res) => {
  const contact = req.body;
  if (!contact.name || !contact.phone || !contact.email) {
    return res.status(400).json("Missing name, phone or email");
  }
  contacts.push(contact);
  res.sendStatus(201);
});

app.put("/api/contacts/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const contact = contacts.find((contact) => contact.id == id);
  if (contact) {
    contact.name = body.name;
    contact.phone = body.phone;
    contact.email = body.email;
    return res.status(200).send(contact);
  }
  return res.sendStatus(404);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
