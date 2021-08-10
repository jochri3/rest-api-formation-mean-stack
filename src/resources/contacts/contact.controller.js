import Contact from "./contact.model.js";
import _ from "lodash";
import { json } from "express";

const findAll = async (_, res) => {
  try {
    const contacts = await Contact.find().select("name phone email status");
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const findOne = async (req, res) => {
  const contact = req.contact;
  res.status(200).json(contact);
};

const create = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send({
      message: "Veuillez remplir tous les champs svp",
    });
  }
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(_.pick(contact, ["id", "name", "email", "phone"]));
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
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
    res.json(_.pick(contact, ["id", "name", "email", "phone"]));
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  const { _id } = req.contact;
  try {
    await Contact.remove(_id);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export default {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
