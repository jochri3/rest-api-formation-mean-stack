import validate from "../resources/contacts/contact.validator.js";

export default function validateContact({ body,method }, res, next) {
  const valid = validate(body,method);
  if (!valid.isValid) {
    return res.status(422).json({ errors: valid.errors });
  }
  next();
}
