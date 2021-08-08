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

export default {
  findAll,
};
