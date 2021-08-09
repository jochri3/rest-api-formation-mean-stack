import Contact from "../resources/contacts/contact.model.js";

module.exports = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send({ message: "not found" });
  }
  const contact = await Contact.findById(id);
  if (!contact.length) {
    return res.status(404).send({ message: "not found" });
  }
  req.contact = contact;
  next();
};
