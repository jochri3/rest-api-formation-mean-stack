import Contact from "./contact.model.js";

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

export default {
  findAll,
  findOne,
};
