import Contact from "../resources/contacts/contact.model.js";

const contactsExists = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send({ message: "not found" });
  }
  try {
    const contact = await Contact.findById(id);
    if (!contact.length) {
      return res.status(404).send({ message: "not found" });
    }
    req.contact = contact;
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export default contactsExists;
