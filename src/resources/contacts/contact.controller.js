import Contact from "./contact.model.js";
import _ from "lodash";

const findAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).send({ message: "Not Found" });
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  //valite input
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send({
      message: "Veuillez remplir tous les champs svp",
    });
  }
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(_.pick(contact, ["id", "name", "email", "phone"]));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send({
      message: "Veuillez remplir tous les champs svp",
    });
  }
  try {
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!contact) return res.status(404).send({ message: "Not Found" });
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default {
  findAll,
  findOne,
  create,
  update,
};
